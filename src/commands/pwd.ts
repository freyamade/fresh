/**
 * Clear the screen.
 */
import { defaultCommandMapping } from 'javascript-terminal'

// Define necessary constants
const _defaultDefinition = defaultCommandMapping.pwd

const summary: string = 'Print name of current/working directory.'

const help: string = `<p class="green">pwd - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">pwd</span></p>`

const optDef = _defaultDefinition.optDef

// Define the function
const execute = _defaultDefinition['function']

// Export the function definition
export const PWD = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
