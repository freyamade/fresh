/**
 * Rewritten class from scratch because idk how to avoid the `chrome` declaration in the ext code
 */
const STORAGE_KEY = 'GHUL_COLORS'
const COLOR_URL = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'

export interface IRepoData {
  [language: string] : number
}

export interface IColorData {
  [language: string] : {
    color : string,
  }
}

interface IAPIRepoData {
  language : string
}

export class GHULError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GHULError'
  }
}

export class FreshGHULData {
  public emptyAccount: boolean
  private isOrg: boolean
  private username: string

  constructor(username: string, isOrg: boolean) {
    this.emptyAccount = true
    this.isOrg = isOrg
    this.username = username
  }

  public getData() : Promise<[IColorData, IRepoData]> {
    // Gets both the color data and repo data and returns a Promise that will resolve to get both of them
    // Calling .then on this should get back an array of two values color and repo data respectively
    return Promise.all([this.getColorData(), this.fetchRepoData()])
  }

  private async getColorData() : Promise<IColorData> {
    // Check sessionStorage for the Colors, if not there then fetch
    let data: IColorData
    let stringData = sessionStorage.getItem(STORAGE_KEY)
    if (stringData == null) {
      // Call the super fetchColorData
      data = await this.fetchColorData()
      // And store it in the session storage
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } 
    else {
      data = JSON.parse(stringData) as IColorData
    }
    return data
  }

  // Fetch the new color data
  private async fetchColorData() : Promise<IColorData> {
    const response = await fetch(COLOR_URL)
    return response.json()
  }

  // Fetch repository data from the API
  private async fetchRepoData() : Promise<IRepoData> {
    const url = this.generateAPIURL()
    let linkHeader : string | null
    let repoData : IRepoData = {}
    // Use Promise.resolve to wait for the result
    let response = await fetch(url)
    linkHeader = response.headers.get('link')

    // Stumbled across this little error tonight
    if (response.status !== 200 ) {
      console.error(response)
      throw new Error(
        `Incorrect status received from GitHub API. Expected 200, received; ${response.status}. ` +
        'See console for more details.',
      )
    }

    let data = await response.json()
    // From this JSON response, compile repoData (to reduce memory usage) and then see if there's more to fetch
    repoData = this.updateRepoData(repoData, data)
    // Now loop through the link headers, fetching more data and updating the repos dict
    let next_url = this.getNextUrlFromHeader(linkHeader)
    while (next_url !== null) {
      // Send a request and update the repo data again
      response = await fetch(next_url)
      linkHeader = response.headers.get('link')
      data = await response.json()
      repoData = this.updateRepoData(repoData, data)
      next_url = this.getNextUrlFromHeader(linkHeader)
    }
    // Still gonna return a promise
    return Promise.resolve(repoData)
  }

  // Parse the important information from fetched repos
  private updateRepoData(repoData: IRepoData, json: IAPIRepoData[]) : IRepoData {
    for (const repo of json) {
      if (repo.language === null) { continue }
      let count = repoData[repo.language] || 0
      count++
      repoData[repo.language] = count
      this.emptyAccount = false
    }
    return repoData
  }

  private generateAPIURL() : string {
    // Generate the correct API URL request given the circumstances of the request
    // Circumstances: Org or User page, and if User page, is it the User using the extension
    const urlBase = 'https://api.github.com'
    const query = 'page=1&per_page=50'
    let url : string
    if (this.isOrg) {
      url = `${urlBase}/orgs/${this.username}/repos?${query}`
    }
    else {
      // Send the request to the normal users endpoint
      url = `${urlBase}/users/${this.username}/repos?${query}`
    }
    return url
  }

  // Helper method to get the next url to go to
  private getNextUrlFromHeader(header: string | null) {
    if (header === null) { return null }
    const regex = /\<(.*)\>/
    // The header can contain many URLs, separated by commas, each with a rel
    // We want only the one that contains rel="next"
    for (const url of header.split(', ')) {
      if (url.includes('rel="next"')) {
        // We need to retrive the actual URL part using regex
        return regex.exec(url)![1]
      }
    }
    return null
  }
}