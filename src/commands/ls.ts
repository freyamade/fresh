import { Command } from './command'
import { Directory } from '../file_system/directory'
import { Fresh } from '../fresh'

export class LS extends Command {
  readonly name: string = 'ls'
  readonly summary: string = 'List the contents of the specified path(s).'
  readonly help: string = `\x1b[32mls - List contents of specfied paths.\x1b[0m

\rUsage:
\r\t\x1b[33mls [path]...\x1b[0m

\rMultiple \x1b[33m'path'\x1b[0m values can be given, separated by spaces.
\r\x1b[33m'path'\x1b[0m may also be omitted, in which case the command will list the contents of the current working directory.`

  /**
   * Given an array of arguments, list the children of each path in the supplied list
   */
  execute(term: Fresh, args: string[]) {
    // Firstly, we need to check if the list of arguments is 0, 1, or more than 1.
    // If 0, list the current working directory
    // If 1, list the node at the specified path
    // If more than 1, iterate through the array and list the contents of each path, with some extra printing around it
    switch (args.length) {
      case 0:
        // Print out a list of the children of the current directory
        term.newline()
        this.listDir(term, term.cwd)
        term.newline()
        break
      case 1:
        this.ls(term, args[0])
        break
      default:
        // Loop through the supplied paths and attempt to run `ls` on each
        args.forEach(path => {
          term.newline()
          term.write(`${path}:`)
          this.ls(term, path)
        })
    }
  }

  /**
   * Given a path to a node, find the node and run the `ls` command on it
   */
  private ls(term: Fresh, path: string) {
    let node
    if (path[0] === '/') {
      node = this.traverse_absolute(term, path)
    }
    else {
      node = this.traverse(term, term.cwd, path)
    }
    if (node === null) {
      return
    }
    term.newline()
    if (node instanceof Directory) {
      this.listDir(term, node)
    }
    else {
      term.write(path)
    }
    term.newline()
  }

  /**
   * Given a Directory node, print out its contents.
   * This method will do no newline management given the variety in the usecases
   */
  private listDir(term: Fresh, dir: Directory) {
    // First, generate the output by doing a quick mapping of the directory's children
    const output = dir.children.map(node => {
      if (node instanceof Directory) {
        return `\x1b[34m${node.name}\x1b[0m/`
      }
      return node.name
    }).join('  ')
    term.write(output)
  }
}
