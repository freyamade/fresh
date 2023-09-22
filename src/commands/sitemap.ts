// The `sitemap` command.
// Gives an overview of other pages that are available but inaccessible from the terminal

import { EmulatorState, OutputFactory } from 'javascript-terminal'

// Define necessary constants
const summary: string = 'Get links to other pages in the site.'

const help: string = `<p class="green">sitemap - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">sitemap</span></p>`

const optDef = {}

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  const output = `
<p><span class="green">┌&nbsp;</span><span class="blue">freyama.de/</p>
<p><span class="green">└──&nbsp;</span><span class="cyan sitemap-nest"><a href="https://freyama.de/some-techtalks" target="_blank">some-techtalks/</a></span> - <span class="yellow">Some old techtalks I gave in college.</span>`
  return { output: OutputFactory.makeTextOutput(output) }
}

// Export the function definition.
export const Sitemap = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
