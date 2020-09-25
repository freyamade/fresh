// The `cv` command.
// Opens my CV in a different window

import { EmulatorState, OutputFactory } from 'javascript-terminal'

// Define necessary constants
const summary: string = 'Get a PDF of my CV.'

const help: string = `<p class="green">cv - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">cv</span></p>
<br />
<p class="yellow">NOTE: Will open in a popup.</p>`

const optDef = {}

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Open the CV in a new window, and then print some output that looks technical... >.>
  let output = "Fetching freyamade.cv... please wait."
  window.setTimeout(() => { window.open('/media/cv.pdf') }, 2000)
  return { output: OutputFactory.makeTextOutput(output) }
}

// Export the function definition.
export const CV = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
