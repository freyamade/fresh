/**
 * List contents of directories.
 */
import { defaultCommandMapping, EmulatorState } from 'javascript-terminal'

// Define necessary constants
const _defaultDefinition = defaultCommandMapping.ls

const summary: string = 'List directory contents.'

const help: string = `<p class="green">ls - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">ls [options] [path]</span></p>
<br />
<p><span class="yellow">path</span> must be a valid path to a directory in the system.</p>
<p><span class="yellow">path</span> may also be omitted, in which case the command will list the current working directory.</p>
<br />
<p>Options:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">-a</span>, <span class="blue">--all</span></p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do not exclude listings starting with .</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">-A</span>, <span class="blue">--almost-all</span></p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do not list implied . and ..</p>`

const optDef = _defaultDefinition.optDef

// Define the function
// Small wrapper around the default that replaces \n with <br /> tags
function execute(state: EmulatorState, args: string[]): any {
  // Run the default command, and reformat the output if it exists
  let result = _defaultDefinition['function'](state, args)
  // The cd command, if successful, only returns `output` if there's an error
  if (result.hasOwnProperty('output')) {
    // Currently, the output is a string split by \n, but we need to turn thse into <br /> tags
    // I also want to make directories coloured, like fish
    result.output = result.output.set(
      'content',
      result.output.content.split('\n').map((name: string) => {
        name = name.trim()
        if (name.substr(-1) === '/') {
          return `<span class="blue">${name}</span>`
        }
        return name
      }).join('<br />'),
    )
  }
  return result
}

// Export the function definition
export const LS = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
