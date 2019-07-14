// Two command classes that involve helping the user
import { Command } from './command'
import { File } from '../file_system/file'
import { Fresh } from '../fresh'

// cat prints the contents of one or more files to the screen
export class Cat extends Command {
  readonly name: string = 'cat'
  readonly summary: string = 'Print file contents.'
  readonly help: string = `\x1b[32mcat - Print file contents.\x1b[0m

  \rUsage:
  \r\t\x1b[33mcat path [path]...\x1b[0m
  \r\x1b[33mcat\x1b[0m prints the contents of each \x1b[33mpath\x1b[0m supplied to the program.
  \r\x1b[33mcat\x1b[0m requires at least one \x1b[33mpath\x1b[0m to be supplied.`

  execute(term: Fresh, args: string[]) {
    // Ensure only 0 or 1 arguments are passed
    if (args.length === 0) {
      term.writeError(`cat: Cannot run with 0 paths.`)
      return
    }
    term.writeNewline()
    for (const path of args) {
      // Try to traverse the path, and then print the contents
      const file = this.traverse(term, term.cwd, path)
      if (file === null) {
        continue
      }
      // Also make sure that the returned node is a File
      if (!(file instanceof File)) {
        term.writeln(`\x1b[31mcat: ${path}: Is a directory\x1b[0m`)
        continue
      }

      // Write the contents of the file
      term.writeln((file as File).contents)
    }
  }
}
