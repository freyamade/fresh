// The `summary` function.
// Prints out each command in the system along with a summary message about them.

import { EmulatorState, OutputFactory } from 'javascript-terminal'

// Define necessary constants
const summary: string = 'Print out a list of available commands in the system.'

const help: string = `<p class="green">? - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">?</span></p>`

const optDef = {}

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Iterate through the command mapping to find all the commands in the system, and print out their summary messages
  const messageBody: string[] = []
  state.getCommandMapping().forEach((details, name) => {
    const message = `<tr><td>${name}</td><td>${details.get('summary')}</td></tr>`
    messageBody.push(message)
  })
  output = `<table class="summary-table">
    <tr><th colspan="2"><span class="magenta">freyama.de</span> currently supports the following commands;</th></tr>
    ${messageBody.sort().join('')}
    <tr><th colspan="2">Run <span class="yellow">'help command'</span> for more information on the specified command.</th></tr>
  </table>`
  return { output: OutputFactory.makeTextOutput(output) }
}

// Export the function definition.
export const Summary = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
