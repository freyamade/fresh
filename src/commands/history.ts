/**
 * Check or clear the terminal history.
 */
import { defaultCommandMapping, EmulatorState } from 'javascript-terminal'

// Define necessary constants
const _defaultDefinition = defaultCommandMapping.history

const help: string = `<p class="green">history - Manipulate the history list.</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">history [-c|--clear]</span></p>
<br />
<p>If run without the <span class="yellow">-c</span> flag, this command will print out the history of the session.</p>
<p>If run with the <span class="yellow">-c</span> flag, this command will erase the current history of the session.</p>`

const optDef = _defaultDefinition.optDef

const summary: string = 'Manipulate the history list.'

// Define the function
// Small wrapper around the default that replaces \n with <br /> tags
function execute(state: EmulatorState, args: string[]): any {
  // Run the default command, and reformat the output if it exists
  let result = _defaultDefinition['function'](state, args)
  // The cd command, if successful, only returns `output` if there's an error
  if (result.hasOwnProperty('output')) {
    // Currently, the output is a string split by \n, but we need to turn thse into <br /> tags
    // The history output is also in reverse order
    result.output = result.output.set('content', result.output.content.split('\n').reverse().join('<br />'))
  }
  return result
}

// Export the function definition
export const History = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
