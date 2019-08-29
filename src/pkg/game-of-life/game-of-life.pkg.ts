import { EmulatorState, OutputFactory } from 'javascript-terminal'
import { Map, fromJS } from 'immutable'

// Define necessary constants
const MIN_SIZE = 1
const MAX_SIZE = 32
// Only have one Game of Life running at once, others can stay paused.
let animationInterval: number | null = null

const summary: string = 'Game of Life, written in Rust and WebAssembly.'

const help: string = `<p class="green">life - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">life width height</span></p>
<br />
<p>Renders a width by height cell canvas and plays Game of Life in it.</p>
<p>Currently, width and height values must each be between 1 and 32 inclusive, to avoid overkill.</p>
<p>Cells are 5px squares, white cells are alive, dead cells are the same colour as the webpage background.</p>
<p>NOTE: Only one Game of Life will run at a time.</p>`

const optDef = {}

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Check if the correct number of arguments is given
  if (args.length !== 2) {
    return {
      output: OutputFactory.makeErrorOutput({
        source: 'life',
        type: 'Game of life requires 2 arguments, width and height.'
      })
    }
  }

  // Ensure both arguments are valid numbers
  for (let arg of args) {
    const numArg: number = +arg
    if (isNaN(numArg)) {
      return {
        output: OutputFactory.makeErrorOutput({
          source: 'life',
          type: `Game of life requires 2 numeric arguments, but "${arg}" is not a valid number.`
        })
      }
    }
    else if (numArg < MIN_SIZE || numArg > MAX_SIZE) {
      return {
        output: OutputFactory.makeErrorOutput({
          source: 'life',
          type: `Width and height must be between ${MIN_SIZE} and ${MAX_SIZE} inclusive, received "${arg}".`
        })
      }
    }
  }

  // Create and return a div that the async function can use to put the canvas into.
  const divId = uuidv4()
  const div = `<div id="${divId}">Game of Life loading...</div>`
  gameOfLife(+args[0], +args[1], divId)
  return {
    output: OutputFactory.makeTextOutput(div)
  }
}

// The actual function that will handle the game of life command
async function gameOfLife(width: number, height: number, divId: string) {
  // This function relies on the fact that the executor generates a div to put either or canvas or error into.
  try {
    const gameMod = await import('./rust/pkg/index')
    const universe = gameMod.Universe.new(width, height)

    // Create a canvas, set the width and height and generate a renderer
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    canvas.height = height * (universe.cell_size() + 1) + 1
    canvas.width = width * (universe.cell_size() + 1) + 1
    const ctx = canvas.getContext('2d')!!

    // Add the canvas to the div
    const parent = document.getElementById(divId)!!
    parent.innerHTML = ''
    parent.appendChild(canvas)

    // Start rendering
    if (animationInterval !== null) {
      clearInterval(animationInterval)
    }
    animationInterval = setInterval(() => { loop(universe, ctx) }, 1000/6)
  }
  catch (e) {
    document.getElementById(divId)!!.innerHTML = `<p class="red">Error when loading Game of Life: ${e}</p>`
  }
}

// Helpers
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function loop(universe: any, ctx: CanvasRenderingContext2D) {
  universe.render(ctx)
  universe.tick()
}

// Create the function definition.
const Life = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}

// Add the command to the Window
declare global {
  interface Window { commands: Map<string, object>; }
}
window.commands = window.commands.set('life', fromJS(Life))
