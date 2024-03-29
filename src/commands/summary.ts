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
  console.log('execute')
  // Iterate through the command mapping to find all the commands in the system, and print out their summary messages
  const internCommands: string[] = []
  const externCommands: string[] = []  // track external commands separately to display them separately
  state.getCommandMapping().forEach((details, name) => {
    console.log(name, details)
    const message = `<tr><td>${name}</td><td>${details.get('summary')}</td></tr>`
    if (details.get('extern') != true) {
      internCommands.push(message) 
    }
    else {
      externCommands.push(message)
    }
  })
  const output = `<table class="summary-table">
    <tr><th colspan="2"><span class="magenta">fresh</span> has the following built-in commands:</th></tr>
    ${internCommands.sort().join('')}` + (externCommands.length > 0 ? `
    <tr><th colspan="2"><span class="magenta">fresh</span> also has the following installed <span class="yellow">pkg</span> commands:</th></tr>
    ${externCommands.sort().join('')}` : ``) + `
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
