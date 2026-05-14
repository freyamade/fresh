import { normalize, join, isAbsolute } from '@chainner/node-path/posix'
import type { BaseProgram } from '@/base_program'
import { isExecutable, type INode } from '@/interfaces/inode'
import { FreshError } from '@/errors'
import { useEnvStore } from '@/stores/env'

class FileSystem {
  IMPORT_ROOT = '/src/file_system'
  CWD: INode
  HOME_PATH = '/freyama.de'
  ROOT_NODE: INode = {
    title: '/',
    path: '/',
    importPath: join(this.IMPORT_ROOT, '/'),
    children: {},
    hidden: false,
    permissions: 0o755,
    contents: null,
    isDir: true,

    // Need to have some workaround for the fact that root node points to itself but we can only do that after it gets defined
    /* eslint-disable @typescript-eslint/no-explicit-any */
    parent: null as any,
  }
  PREV_CWD_PATH: string | null = null

  constructor() {
    // Point the root node's parent to itself for future cd command
    this.ROOT_NODE.parent = this.ROOT_NODE

    // Glob our real files and build the nodes
    const files = import.meta.glob<string>('/src/file_system/**/*', {
      query: '?raw',
      import: 'default',
      exhaustive: true,
    })
    // Parse the globs once at the beginning and build up the nodes
    for (const [filePath, getContents] of Object.entries(files)) {
      const fileSystemPath = filePath.replace(this.IMPORT_ROOT, '')
      // Split the path by / and start adding the nodes to the root
      const nodeList = fileSystemPath.split('/').filter((nodeName) => nodeName !== '')
      const leafNodeName = nodeList.pop()!
      let currentNode = this.ROOT_NODE
      for (const nodeName of nodeList) {
        // Check if we have a node under the root for this directory
        let node = currentNode.children[nodeName] || null
        if (node == null) {
          // Make a new directory node for this newly found directory
          const internalPath = join(currentNode.path, nodeName)
          node = {
            title: nodeName,
            path: internalPath,
            importPath: join(this.IMPORT_ROOT, internalPath),
            parent: currentNode,
            children: {},
            hidden: nodeName.startsWith('.'),
            permissions: 0o775,
            contents: null,
            isDir: true,
          }
          currentNode.children[nodeName] = node
        }
        currentNode = node
      }
      // Because we glob, we can't have empty dirs so leaf has to be a valid file
      const internalPath = join(currentNode.path, leafNodeName)
      currentNode.children[leafNodeName] = {
        title: leafNodeName,
        path: internalPath,
        importPath: join(this.IMPORT_ROOT, internalPath),
        parent: currentNode,
        children: {},
        hidden: leafNodeName.startsWith('.'),
        permissions: currentNode.title === 'bin' ? 0o555 : 0o664,
        contents: getContents,
        isDir: false,
      }
    }
    this.CWD = this.getNode(this.HOME_PATH)!
  }

  get currentDirForPrompt(): string {
    return this.CWD.path.replace(this.HOME_PATH, '~')
  }

  private normalizeRelativePath(path: string): string {
    if (!isAbsolute(path)) path = normalize(join(this.CWD.path, path))
    return path
  }

  getNode(path: string): INode | null {
    path = this.normalizeRelativePath(path)
    const nodeList = path.split('/').filter((nodeName) => nodeName !== '')
    let currentNode: INode | null = this.ROOT_NODE
    for (const nodeName of nodeList) {
      currentNode = currentNode.children[nodeName] || null
      if (currentNode == null) {
        return null
      }
    }
    return currentNode
  }

  exists(path: string): boolean {
    return this.getNode(path) != null
  }

  private findBinFile(commandName: string): INode | null {
    const pathsToTry = [
      commandName,
      `${commandName}.ts`,
      `/bin/${commandName}`,
      `/bin/${commandName}.ts`,
    ]
    for (const path of pathsToTry) {
      const node = this.getNode(path)
      if (node != null) return node
    }
    return null
  }

  async run(commandName: string): Promise<BaseProgram> {
    let node: INode | null
    // If we specify an absolute path it has to be a correct absolute path
    if (isAbsolute(commandName)) node = this.getNode(commandName)
    // Otherwise see if we can find the file in question
    else node = this.findBinFile(commandName)

    if (node == null) {
      throw new FreshError(`${commandName}: command not found`)
    } else if (node.isDir) {
      throw new FreshError(`${commandName}: is a directory`)
    } else if (!isExecutable(node)) {
      throw new FreshError(`${commandName}: file exists but is not an executable file`)
    }
    // Import that file as JS, grab the default, instantiate it and return it
    const fileName = node.title.replace('.ts', '')
    const binFile = await import(`@/file_system/bin/${fileName}.ts`) // redefine the string here in such a way that vite knows all the possible imports
    const program = new binFile.default()
    return program
  }

  async read(path: string): Promise<string | null> {
    const node = this.getNode(path)
    if (node == null) {
      throw new FreshError(`${path}: file not found`)
    }
    if (node.isDir) {
      throw new FreshError(`${path}: is a directory`)
    }
    if (node.contents == null) return null
    return await node.contents()
  }

  changeDirectory(path: string | null): void {
    if (path == null || path === '~') path = this.HOME_PATH
    else if (path === '-') {
      if (this.PREV_CWD_PATH == null) throw new FreshError('directory history unavailable')
      else path = this.PREV_CWD_PATH
    }
    const newNode = this.getNode(path)
    if (newNode == null) {
      throw new FreshError(`directory "${path}" does not exist.`)
    }
    this.PREV_CWD_PATH = this.CWD.path
    this.CWD = newNode
  }

  // Probably not the best place to put this but it's the most logical due to using the file system almost completely for completions
  suggestCompletions(inputString: string): {
    all: string[]
    filtered: string[]
    autocomplete: string | null
  } {
    /* Split input on spaces to look at the relevant chunk of text;
     *     If the chunk starts with a /, assume it is a path and fill it as such
     *     If it instead starts with a $, assume it is an env var
     *     Otherwise, if its the first chunk, assume it's a command name
     *     Otherwise, assume it's a relative path
     */
    const inputChunks = inputString.split(' ')

    // Look at the relevant chunk according to our rules
    let suggestions: string[] = []
    const relevantChunk = inputChunks[inputChunks.length - 1]!
    if (relevantChunk.startsWith('$')) {
      const { getVarsForCompletions } = useEnvStore()
      suggestions = getVarsForCompletions()
    } else if (
      inputChunks.length === 1 &&
      !(relevantChunk.startsWith('/') || relevantChunk.startsWith('..'))
    ) {
      const binNode = this.getNode('/bin')!
      suggestions = Object.values(binNode.children).map((node) => node.title.replace('.ts', ''))
    } else {
      suggestions = this.suggestPaths(relevantChunk)
    }

    // Prep the return data
    suggestions.sort((a, b) => a.localeCompare(b))
    const filtered = suggestions.filter((name) => name.startsWith(relevantChunk))
    let autocomplete = null
    if (filtered.length === 1) {
      inputChunks.pop()
      inputChunks.push(filtered[0]!)
      autocomplete = inputChunks.join(' ')
    }

    return {
      all: suggestions,
      filtered,
      autocomplete,
    }
  }

  private suggestPaths(startingPath: string): string[] {
    // Find the latest real node in the path, and then use its children for autocompletion of the final piece
    const absPath = isAbsolute(startingPath)
    const startAt = absPath ? this.ROOT_NODE : this.CWD
    const node = this.findLatestNodeInPath(startingPath, startAt)

    // Edge case; if search path is exactly the same as the current node (specifically without the /) (or ..) and current node is a dir, then return the current search path with a /
    const pathChunks = startingPath.split('/')
    const specialCases = [node.title, '..']
    if (specialCases.includes(pathChunks[pathChunks.length - 1]!) && node.isDir) {
      return [`${startingPath}/`]
    }
    // Otherwise return the titles of all children, joined with the current search path
    return Object.values(node.children).map((child) => {
      let suggestion = child.title
      if (child.isDir) suggestion += '/'
      pathChunks[pathChunks.length - 1] = suggestion
      return pathChunks.join('/')
    })
  }

  private findLatestNodeInPath(path: string, startAt: INode): INode {
    // Traverse a path to find the latest real node in it, starting from either root or cwd based on the path's relativity
    const nodeList = path.split('/').filter((nodeName) => nodeName !== '')
    for (const nodeName of nodeList) {
      // Handle special paths
      if (nodeName === '.') {
        continue
      } else if (nodeName === '..') {
        startAt = startAt.parent
      } else if (Object.hasOwn(startAt.children, nodeName)) {
        startAt = startAt.children[nodeName]!
      } else {
        break
      }
    }
    return startAt
  }
}

const instance = new FileSystem()
export default function useFileSystem() {
  return instance
}
