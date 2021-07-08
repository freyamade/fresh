// The `whoami` function.
// Prints out details about myself.

import { EmulatorState, OutputFactory } from 'javascript-terminal'

// Define necessary constants
const details: string = `<p><span class="magenta">freya madeline broderick</span></p>
<br />
<p>I am a full stack developer, and I dabble quite a bit in the ops side of things as well.</p>
<p>I am extremely passionate, both in programming and in other aspects of my life.</p>
<p>I'm experienced in Python, Crystal and TypeScript, as well as Docker, and both the design and construction of REST APIs.</p>
<p>I also have a strong interest in Ansible, Kubernetes, and Ops.</p>
<p>I hold a first class honours BSc degree in Computer Science from University College Cork (UCC)</p>
<br />
<p><span class="green">email&nbsp;&nbsp;&nbsp;- <span class="underline">frybrdrck@gmail.com</span></span></p>
<p><span class="blue">github&nbsp;&nbsp;- <a href="https://github.com/freyamade">https://github.com/freyamade</a></span></p>
<p><span class="cyan">keybase&nbsp;- <a href="https://keybase.io/freyamade">https://keybase.io/freyamade</a></span></p>
<br />
<p>Current employment: <span class="cyan">CTO @ CloudCIX Ltd</span></p>`
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
