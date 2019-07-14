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
  readonly help: string = `\x1b[32m? - Print out a list of available commands.\x1b[0m

\rUsage:
\r\t\x1b[33m?\x1b[0m`

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
  readonly help: string = `\x1b[32mhelp - Get instructions for commands.\x1b[0m

\rUsage:
\r\t\x1b[33mhelp [command_name]\x1b[0m

\r\x1b[33m'command_name'\x1b[0m can be the name of a command in the system.
\r\x1b[33m'command_name'\x1b[0m may also be omitted, in which case an introductory message will be printed instead.`
  private intro: string = `\x1b[35mfreyama.de\x1b[0m - The homepage of Freya Madeline Broderick.

\rBuilt to resemble a terminal, it is fully interactive and contains all of the usual things a personal website would contain, plus maybe some easter eggs!
\rFor a list of available commands, run \x1b[33m'?'\x1b[0m`

  execute(term: Fresh, args: string[]) {
    // Ensure only 0 or 1 arguments are passed
    if (args.length >= 2) {
      term.logError(`help: Too many arguments (${args.length}). Expected 0 or 1.`)
    }

    // If 0, write out a help message for the system
    if (args.length === 0) {
      term.newline()
      term.write(this.intro)
      term.newline()
    }
    // If 1, find the command whose name is the same as the passed argument, and print out its help message
    else {
      const cmdName = args[0]
      // Output the correct message
      let found = false
      Commands.forEach(cmd => {
        if(cmd.name === cmdName) {
          found = true
          term.newline()
          term.write(cmd.help)
          term.newline()
          return
        }
      })
      if (!found) {
        term.logError(`help: '${cmdName}' is not a valid command`)
      }
    }
  }
}
