import { EmulatorState, OutputFactory } from 'javascript-terminal'
import { Map, fromJS } from 'immutable'

// Define necessary constants
const message: string = `<p>Package installation works! \\o/.</p>
<br />
<p>Now if I could just figure out what kind of packages I can provide...</p>`
const summary: string = 'Test package for testing package installation.'

const help: string = `<p class="green">test - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">test</span></p>`

const optDef = {}

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Just return the details string
  return {output: OutputFactory.makeTextOutput(message)}
}

// Create the function definition.
const Test = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}

// Add the command to the Window
declare global {
  interface Window { commands: Map<string, object>; }
}
window.commands = window.commands.set('test', fromJS(Test))
