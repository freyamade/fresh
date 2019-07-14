// Two command classes that involve helping the user
import { Command } from './command'
import { Fresh } from '../fresh'

// whoami prints out contact information for myself
export class WhoAmI extends Command {
  readonly name: string = 'whoami'
  readonly summary: string = 'Get information about the girl behind the website.'
  readonly help: string = `\x1b[32mwhoami - Get contact information.\x1b[0m

\rUsage:
\r\t\x1b[33mwhoami\x1b[0m`
  readonly details: string = `\x1b[35mfreya madeline broderick\x1b[0m
\r\t\x1b[32m${this.leftJustify('email', 7)} - \x1b[4mhello@freyama.de\x1b[0m
\r\t\x1b[34m${this.leftJustify('github', 7)} - \x1b[4mhttps://github.com/freyamade\x1b[0m
\r\t\x1b[36m${this.leftJustify('keybase', 7)} - \x1b[4mhttps://keybase.io/freyamade\x1b[0m`

  execute(term: Fresh, args: string[]) {
    // Ensure only 0 or 1 arguments are passed
    if (args.length !== 0) {
      term.writeError(`whoami: Too many arguments (${args.length}). Expected 0.`)
    }

    term.writeMessage(this.details)
  }
}
