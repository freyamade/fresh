import { Directory } from '../file_system/directory'
import { FileSystem, Home } from '../file_system/file_system'
import { Fresh } from '../fresh'
import { Node } from '../file_system/node'

export abstract class Command {
  // Keep track of the name of the command, which will be used to determine which Command class needs to be run
  readonly name: string = ''
  // Summary to be used for the `?` method
  readonly summary: string = ''
  // Description to be used for the `help` method
  readonly help: string = ''

  // Abstract methods that need to be defined by all commands
  abstract execute(term: Fresh, args: string[]): void

  // Helper methods

  /**
   * Wrapper method around the traverse_* methods that does all the hard work
   */
  traverse(term: Fresh, relDir: Directory, path: string): Node | null {
    if (path[0] === '/') {
      return this.traverse_absolute(term, path)
    }
    else {
      return this.traverse_relative(term, relDir, path)
    }
  }

  /**
   * Attempt to traverse a given absolute path, returning the child node reached, if any
   */
  traverse_absolute(term: Fresh, path: string): Node | null {
    if (path === '/') {
      return FileSystem
    }
    return this.traverse_relative(term, FileSystem, path)
  }

  /**
   * Attempt to traverse a given relative path, starting from a given Directory, and return the child node reached, if any
   */
  traverse_relative(term: Fresh, node: Directory, path: string): Node | null {
    // Remove leading and trailing slashes before splitting
    let usedPath = path.replace(/(^\/)|(\/$)/g, '')
    const traversals = usedPath.split('/')
    // Iterate through the traversals array, updating the node pointer as necessary
    let index = 0
    while (index < traversals.length) {
      // At each step, check that the node has a child with the given name
      // If so, make sure it's a Directory before continuing
      let child = node.getChild(traversals[index])
      if (child === null) {
        term.writeError(`${this.name}: The file or directory '${path}' does not exist.`)
        return null
      }
      if (!(child instanceof Directory) && index < traversals.length - 1) {
        term.writeError(`${this.name}: '${path}' is not a directory.`)
        return null
      }

      // If we made it through, update the node and index variables
      node = child
      index++
    }
    return node
  }

  /**
  * Justify a string to the specified width
  */
  leftJustify(str: string, width: number): string {
    while (str.length < width) {
      str = `${str} `
    }
    return str
  }
}
