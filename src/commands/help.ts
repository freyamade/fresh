// Two command classes that involve helping the user
import { Command } from './command'
import { Commands } from './commands'
import { Fresh } from '../fresh'

// Helper methods
/**
* Justify a string to the specified width
*/
function leftJustify(str: string, width: number): string {
  while (str.length < width) {
    str = `${str} `
  }
  return str
}

// Summary lists all commands in the system by name and prints out the summaries
export class Summary extends Command {
  readonly name: string = '?'
  readonly summary: string = 'Print out this list of available commands.'

  execute(term: Fresh, args: string[]) {
    // Loop through the list of commands, and print them out
    term.newline()
    term.writeln('\x1b[35mfreyama.de\x1b[0m currently supports the following commands:')
    Commands.forEach(cmd => {
      term.writeln(`    \x1b[33m${leftJustify(cmd.name, 6)}\x1b[0m - ${cmd.summary}`)
    })
    term.writeln('Run \x1b[33m`help command`\x1b[0m for more information on the specified command')
  }
}

// Help provides help on a specified command
export class Help extends Command {
  readonly name: string = 'help'
  readonly summary: string = 'Get help and usage instructions for the commands in this website.'

  execute(term: Fresh, args: string[]) {
    term.logError('help: Not yet implemented.')
  }
}
