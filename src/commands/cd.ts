/**
 * Change the current directory of the system.
 */
import { defaultCommandMapping, EmulatorState, OutputFactory, OutputType } from 'javascript-terminal'

// Define necessary constants
const _defaultDefinition = defaultCommandMapping.cd

const summary: string = 'Change the working directory of the terminal session.'

const help: string = `<p class="green">cd - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">cd [path]</span></p>
<br />
<p><span class="yellow">path</span> is a valid path to a directory in the system.</p>
<p><span class="yellow">path</span> may also be omitted, in which case the command will return to the home directory.</p>`

const optDef = _defaultDefinition.optDef

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // If no args are sent, the default command returns to '/', so fix that
  if (args.length === 0) {
    args = [state.getEnvVariables().get('home')]
  }
  // Run the default command, and if any errors occur replace the `fs` in the text with `cd`.
  let result = _defaultDefinition['function'](state, args)
  // The cd command, if successful, only returns `output` if there's an error
  if (result.hasOwnProperty('output')) {
    // Replace the `fs` in the error message with `cd`
    result.output = result.output.set('content', result.output.content.replace('fs:', 'cd:'))
  }
  return result
}

// Export the function definition
export const CD = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
