/**
 * Combines one or more files to display in the terminal output
 * Usage: cat file1.txt file2.txt
 */
import { defaultCommandMapping, EmulatorState, OutputFactory, OutputType } from 'javascript-terminal'

// Define necessary constants
const _defaultDefinition = defaultCommandMapping.cat

const summary: string = 'Concatenate files and print on the standard output.'

const help: string = `<p class="green">cat - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">cat path [path...]</span></p>
<br />
<p>Where each <span class="yellow">path</span> is a valid path to a file in the system.</p>
<p>The version of cat without a parameter is not currently supported.</p>`

const optDef = _defaultDefinition.optDef

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Run the default command, then replace the `fs` in any output with `cat`.
  let result = _defaultDefinition['function'](state, args)
  if (!result.hasOwnProperty('outputs')) {
    // This only happens if they cat nothing, so return our own error
    return {
      output: OutputFactory.makeErrorOutput({
        source: 'cat',
        type: 'Zero parameter execution mode currently not supported.',
      })
    }
  }
  let outputs = result.outputs.map((output, index) => {
    if (output.type === OutputType.TEXT_ERROR_OUTPUT_TYPE) {
      // Replace the default error message with some extra details
      return output.set('content', output.content.replace('fs:', `cat: '${args[index]}':`))
    }
    return output
  })
  return { outputs }
}

// Export the function definition
export const Cat = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
