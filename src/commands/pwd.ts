// Two command classes that involve helping the user
import { Command } from './command'
import { Fresh } from '../fresh'

// pwd prints the full path of the current working directory
export class PWD extends Command {
  readonly name: string = 'pwd'
  readonly summary: string = 'Print the current working directory.'
  readonly help: string = `\x1b[32mpwd - Print the current working directory.\x1b[0m

\rUsage:
\r\t\x1b[33mpwd\x1b[0m`

  execute(term: Fresh, args: string[]) {
    // Ensure only 0 or 1 arguments are passed
    if (args.length !== 0) {
      term.writeError(`pwd: Too many arguments (${args.length}). Expected 0.`)
    }

    term.writeMessage(term.cwd.toString())
  }
}
