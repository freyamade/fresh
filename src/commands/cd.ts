import { Command } from './command'
import { Directory } from '../file_system/directory'
import { File } from '../file_system/file'
import { Fresh } from '../fresh'
import { Home } from '../file_system/file_system'
import { Node } from '../file_system/node'

export class CD extends Command {
  readonly name: string = 'cd'
  readonly summary: string = 'Change the current working directory of the terminal session.'
  readonly help: string = `\x1b[32mcd - Change the working directory.\x1b[0m

\rUsage:
\r\t\x1b[33mcd [path]\x1b[0m

\r\x1b[33m'path'\x1b[0m may be a relative or absolute path to another directory in the file system.
\r\x1b[33m'path'\x1b[0m may also be omitted, in which case the command will return the user to the home directory.`

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
      term.cwd = Home
      return
    }

    // Get the path from the params
    const path = args[0]

    // Check if the path is relative or absolute
    let node: Node | null
    if (path[0] === '/') {
      node = this.absolute(term, path)
    }
    else {
      node = this.relative(term, path)
    }
    if (node === null) {
      // The traverse function already logged the error, return out of here
      return
    }
    // Check that the returned node is also a directory, very important
    if (!(node instanceof Directory)) {
      term.logError(`cd: '${path}' is not a directory.`)
      return
    }

    // Update the cwd of the terminal
    term.cwd = node as Directory
  }

  /**
   * Change directory using an absolute path
   */
  private absolute(term: Fresh, path: string): Node | null {
    // Find the node to change to. If the return value is null, there was an error so we don't do anything
    // Use traverse_absolute instead of traverse
    return this.traverse_absolute(term, path)
  }

  /**
   * Change directory using a relative path
   */
  private relative(term: Fresh, path: string): Node | null {
    // Find the node to change to. If the return value is null, there was an error so we don't do anything
    return this.traverse(term, term.cwd, path)
  }
}
