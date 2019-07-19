/**
 * Check or clear the terminal history.
 */
import { defaultCommandMapping, EmulatorState } from 'javascript-terminal'

// Define necessary constants
const _defaultDefinition = defaultCommandMapping.printenv

const help: string = `<p class="green">printenv - Print all or part of environment.</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">printenv [var]</span></p>
<br />
<p>If <span class="yellow">var</span> is provided, attempt to print out the value of that variable.</p>
<p>Otherwise, print the values of all variables in the environment.</p>`

const optDef = _defaultDefinition.optDef

const summary: string = 'Print all or part of environment.'

// Define the function
// Small wrapper around the default that replaces \n with <br /> tags
function execute(state: EmulatorState, args: string[]): any {
  // Run the default command, and reformat the output if it exists
  let result = _defaultDefinition['function'](state, args)
  // The cd command, if successful, only returns `output` if there's an error
  if (result.hasOwnProperty('output')) {
    // Currently, the output is a string split by \n, but we need to turn thse into <br /> tags
    // The history output is also in reverse order
    result.output = result.output.set('content', result.output.content.split('\n').join('<br />'))
  }
  return result
}

// Export the function definition
export const PrintEnv = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
