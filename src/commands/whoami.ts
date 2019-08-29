// The `whoami` function.
// Prints out details about myself.

import { EmulatorState, OutputFactory } from 'javascript-terminal'

// Define necessary constants
const details: string = `<p><span class="magenta">freya madeline broderick</span></p>
<br />
<p>I am currently working as the senior developer in charge of CloudCIX's Cloud platform.</p>
<p>I am a full stack developer, and I dabble quite a bit in the ops side of things as well.</p>
<p>I am extremely passionate towards the creation of software and I strive for perfection in everything I do, in and out of work.</p>
<br />
<p><span class="green">&nbsp;&nbsp;&nbsp;&nbsp;email&nbsp;&nbsp;&nbsp;- <span class="underline">hello@freyama.de</span></span></p>
<p><span class="blue">&nbsp;&nbsp;&nbsp;&nbsp;github&nbsp;&nbsp;- <a href="https://github.com/freyamade">https://github.com/freyamade</a></span></p>
<p><span class="cyan">&nbsp;&nbsp;&nbsp;&nbsp;keybase&nbsp;- <a href="https://keybase.io/freyamade">https://keybase.io/freyamade</a></span></p>`
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
