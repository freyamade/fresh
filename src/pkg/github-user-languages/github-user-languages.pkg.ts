import { EmulatorState, OutputFactory, OptionParser } from 'javascript-terminal'
import { Map, fromJS } from 'immutable'
import { uuidv4 } from '../utils'
import { FreshGHUL } from './fresh_ghul'

const summary: string = 'Github User Languages, my browser extension, in terminal form.'

const help: string = `<p class="green">ghul - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">ghul [options] username</span></p>
<br />
<p>Performs a lookup for a given username on Github, and renders a piechart displaying their language usage in their repos.</p>
<p>If looking up an organisation account, the <span class="blue">--org</span> flag should be passed to ensure it loads data correctly.</p>
<p>There's no safe way to pass this version a token so it can't check / include private repositories.</p>
<p>If you'd like to get the browser extension version, run <span class="yellow">cat ~/projects/github-user-languages</span>.</p>
<br />
<p>Options:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">-o</span>, <span class="blue">--org</span></p>
<p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  Flag stating that the given username is an organisation. Request may work without but better to be safe than sorry!
</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">-l</span>, <span class="blue">--legend</span></p>
<p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  If this flag is passed, pie chart will render with a legend for the colours.
</p>`

const optDef = {
  '-o, --org': '',
  '-l, --legend': '',
}

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Check if the correct number of arguments is given
  const {argv, options} = OptionParser.parseOptions(args, optDef)
  if (argv.length !== 1) {
    return {
      output: OutputFactory.makeErrorOutput({
        source: 'ghul',
        type: 'Username required but none was given.'
      })
    }
  }

  // Create and return a div that the async function can use to put the canvas into.
  const divId = uuidv4()
  const div = `<div id="${divId}" style="max-width:400px;max-height:500px">Github User Languages loading...</div>`
  // Run the function to fetch the data in a second, then return the div so it can be present
  window.setTimeout(() => render(argv[0], divId, options.org, options.legend))
  return {
    output: OutputFactory.makeTextOutput(div)
  }
}

// By this time, the div will be rendered
async function render(username: string, divId: string, isOrg: boolean, showLegend: boolean) {
  const container: HTMLDivElement = document.getElementById(divId)!! as HTMLDivElement
  new FreshGHUL(username, container, !!isOrg, !!showLegend)
}

// Create the function definition.
const GHUL = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
  extern: true,
}

// Add the command to the Window
declare global {
  interface Window { commands: Map<string, object>; }
}
window.commands = window.commands.set('ghul', fromJS(GHUL))
