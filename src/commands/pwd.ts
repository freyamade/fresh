/**
 * Clear the screen.
 */
import { defaultCommandMapping } from 'javascript-terminal'

// Define necessary constants
const _defaultDefinition = defaultCommandMapping.pwd

const help: string = `<p class="green">pwd - Print name of current/working directory.</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">pwd</span></p>`

const optDef = _defaultDefinition.optDef

const summary: string = 'Print name of current/working directory.'

// Define the function
const execute = _defaultDefinition['function']

// Export the function definition
export const PWD = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
