// The `help` function.
// Get help for the system, or a command, if specified.

import { EmulatorState, OutputFactory } from 'javascript-terminal'

// Define necessary constants.
const help: string = `<p class="yellow">? - Print out a list of available commands in the system.</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="green">?</span></p>`

const optDef = {}

const siteHelp = `<p><span class="magenta">freyama.de</span> - The homepage of Freya Madeline Broderick.</p>
  <p>Built to resemble a terminal, it is fully interactive and contains all of the usual things a personal website would contain, plus maybe some easter eggs!</p>
  <p>For a list of available commands, run <span class="yellow">'?'</span>.</p>
  <p><span class="green">GitHub - <a href="https://github.com/freyamade/fresh">https://github.com/freyamade/fresh</a></span></p>`

const summary: string = 'Get help and usage instructions for the commands in this website.'

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Check if there are a correct number of args
  if (args.length >= 2) {
    return {
      output: OutputFactory.makeErrorOutput({
        source: 'help',
        type: `Too many arguments (${args.length}). Expected 0 or 1.`,
      }),
    }
  }

  // Write out the intro message if no args are sent.
  if (args.length === 0) {
    return { output: OutputFactory.makeTextOutput(siteHelp) }
  }

  // Check that the command that was given is a valid command.
  const command = args[0]
  const commandMapping = state.getCommandMapping()
  if (!commandMapping.has(command)) {
    return {
      output: OutputFactory.makeErrorOutput({
        source: 'help',
        type: `'${command}' is not a valid command.`,
      }),
    }
  }
  return { output: OutputFactory.makeTextOutput(commandMapping.get(command).get('help')) }
}

// Export the function definition.
export const Help = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
