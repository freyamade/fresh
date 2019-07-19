/**
 * Clear the screen.
 */
import { defaultCommandMapping } from 'javascript-terminal'

// Define necessary constants
const _defaultDefinition = defaultCommandMapping.clear

const summary: string = 'Clear the outputs from the terminal.'

const help: string = `<p class="green">clear - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">clear</span></p>
<br />
<p>This version of <span class="yellow">clear</span> will remove all of the previously rendered output from the screen.</p>`

const optDef = _defaultDefinition.optDef

// Define the function
const execute = _defaultDefinition['function']

// Export the function definition
export const Clear = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
