// The `whoami` function.
// Prints out details about myself.

import { EmulatorState, OutputFactory } from 'javascript-terminal'

// Define necessary constants
const details: string = `<p><span class="magenta">freya madeline broderick</span></p>
<br />
<p>full stack developer, with a particular liking of Django and VueJS</p>
<p>experienced in Python, Crystal, TypeScript</p>
<p>passionate about learning and gaining experience with new technology / programming languages</p>
<br />
<p><span class="blue">github&nbsp;&nbsp;- <a href="https://github.com/freyamade">https://github.com/freyamade</a></span></p>
<br />
<p>Current employment: <span class="cyan">Mid Level Software Engineer @ honu.ai</span></p>`
const summary: string = 'Get information about the girl behind the website.'

const help: string = `<p class="green">whoami - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">whoami</span></p>`

const optDef = {}

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Just return the details string
  return {output: OutputFactory.makeTextOutput(details)}
}

// Export the function definition.
export const WhoAmI = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
