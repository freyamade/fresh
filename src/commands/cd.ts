import { Command } from './command'
import { Fresh } from '../fresh'
import { FileSystem, Home } from '../file_system/file_system'
import { File } from '../file_system/file'
import { Directory } from '../file_system/directory'

export class CD {
  readonly name: string = 'cd'

  /**
   * Given a params containing a `path` key, change the terminal's current directory
   */
  execute(term: Fresh, args: string[]) {
    // Ensure that the number of arguments is less than 2
    if (args.length >= 2) {
      term.logError(`cd: Too many arguments (${args.length}). Expected 0 or 1.`)
      return
    }

    // If there are no args, change dir to the home dir
    if (args.length === 0) {
      console.log('cd.home')
      return
    }

    // Get the path from the params
    const path = args[0]

    // Check if the path is relative or absolute
    if (path[0] === '/') {
      this.absolute(term, path)
    }
    else {
      this.relative(term, path)
    }
  }

  /**
   * Change directory using an absolute path
   */
  private absolute(term: Fresh, path: string) {
    // Find the node to change to. If the return value is null, there was an error so we don't do anything
    // Remove the starting / as it will mess everything up
    const newNode = this.cd(term, FileSystem, path.substr(1))
    if (newNode === null) {
      return
    }
    // Update the terminal's cwd value
    term.cwd = newNode
  }

  /**
   * Change directory using a relative path
   */
  private relative(term: Fresh, path: string) {
    // Find the node to change to. If the return value is null, there was an error so we don't do anything
    const newNode = this.cd(term, term.cwd, path)
    if (newNode === null) {
      return
    }
    // Update the terminal's cwd value
    term.cwd = newNode
  }

  /**
   * Handle the actual changing of the directory, given a path and a starting node
   */
  private cd(term: Fresh, node: Directory, path: string): Directory | null {
    // Split the string on /
    const traversals = path.split('/')
    // Iterate through the traversals array, updating the node pointer as necessary
    let index = 0
    while (index < traversals.length) {
      // At each step, check that the node has a child with the given name
      // If so, make sure it's a Directory before continuing
      let child = node.getChild(traversals[index])
      if (child === null) {
        term.logError(`cd: The directory '${path}' does not exist.`)
        return null
      }
      if (!(child instanceof Directory)) {
        term.logError(`cd: '${path}' is not a directory.`)
        return null
      }

      // If we made it through, update the node and index variables
      node = child
      index++
    }
    return node
  }
}
