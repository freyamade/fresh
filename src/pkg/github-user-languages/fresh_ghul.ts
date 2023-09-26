/**
 * Replace the LanguageDisplay class in the GHUL repo with a simpler custom one
 */
import { ArcElement, Chart, Legend, LineElement, PieController, Tooltip } from 'chart.js'
import { FreshGHULData, GHULError, IColorData, IRepoData } from './fresh_ghul_data'

const WIDTH = 400

export class FreshGHUL {
  private canvas! : HTMLCanvasElement
  private container : HTMLDivElement
  private data : FreshGHULData
  private showLegend : boolean

  constructor(username: string, container: HTMLDivElement, isOrg: boolean, showLegend: boolean) {
    // Register the parts of Chart.js I need
    Chart.register(PieController, Tooltip, Legend, ArcElement, LineElement)
    console.log('starting fghul with', username, isOrg, showLegend)
    this.data = new FreshGHULData(username, isOrg)
    this.container = container
    this.showLegend = showLegend
    // Fetch the lang data now
    this.getData()
  }

  private async getData() {
    // Fetch the color data from the json file
    // Use the promise provided by the Data class to get all necessary data
    try {
      const values = await this.data.getData()
      // 0 -> color data, 1 -> repo data
      const colorData : IColorData = values[0]
      const repoData : IRepoData = values[1]
      // If the repoData is empty, don't go any further
      if (this.data.emptyAccount) {
        return
      }
      
      // Build the graph
      this.build(colorData, repoData)
    } catch (e) {
      console.error(`gh-user-langs: Error creating graph: ${e}`)
      // This is where we need to add the error display
      // If the error is an api error, just get the message out of it, otherwise insert generic message
      let message = 'An error occurred when fetching data from the GitHub API. This could be due to rate-limiting.' +
        ' Please try again later or add a personal access token for increase API usage, or see console for more info.'
      if (e instanceof GHULError) {
        message = e.message
      }
      this.container.innerHTML = ''
      this.container.appendChild(document.createTextNode(message))
    }
  }

  private createCanvas() {
    // Create the canvas to put the chart in
    const canvas = document.createElement('canvas')
    // Before creating the Charts.js thing ensure that we set the
    // width and height to be the computed width of the containing div
    canvas.id = 'github-user-languages-language-chart'
    canvas.width = WIDTH
    canvas.height = WIDTH
    // Save the canvas
    return canvas
  }

  private build(colorData: IColorData, repoData: IRepoData) {
    this.canvas = this.createCanvas()
    this.container.innerHTML = ''
    this.container.appendChild(this.canvas)

    // Create the pie chart and populate it with the repo data
    const counts: number[] = []
    const colors: string[] = []
    const langs: string[] = []
    for (const prop of Object.keys(repoData).sort()) {
      if (repoData.hasOwnProperty(prop)) {
        // Prop is one of the languages
        langs.push(prop)
        counts.push(repoData[prop])
        colors.push((colorData[prop] || {}).color || '#ededed')
      }
    }
    // Update the canvas height based on the number of languages
    this.canvas.height += (20 * Math.ceil(langs.length / 2))
    new Chart(this.canvas, {
      data: {
        datasets: [{
          backgroundColor: colors,
          data: counts,
          label: 'Repo Count',
        }],
        labels: langs,
      },
      options: {
        plugins: {
          legend: {
            display: this.showLegend,
          },
        },
      },
      type: 'pie',
    })
  }

}
