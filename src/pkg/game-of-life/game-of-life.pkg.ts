import { EmulatorState, OutputFactory, OptionParser } from 'javascript-terminal'
import { Map, fromJS } from 'immutable'

// Define necessary constants
const MIN_SIZE = 1
const MAX_SIZE = 64
// Only have one Game of Life running at once, others can stay paused.
let animationInterval: number | null = null

const summary: string = 'Game of Life, written in Rust and WebAssembly.'

const help: string = `<p class="green">life - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">life [options] width height</span></p>
<br />
<p>Renders a width by height cell canvas and plays Game of Life in it.</p>
<p>This canvas represents a world that will wrap at the edges, allowing for infinite patterns.</p>
<p>Currently, width and height values must each be between ${MIN_SIZE} and ${MAX_SIZE} inclusive, to avoid overkill.</p>
<p>Cells are 5px squares, white cells are alive, dead cells are the same colour as the webpage background.</p>
<p>NOTE: Only one Game of Life will run at a time.</p>
<br />
<p>Options:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">-r</span>, <span class="blue">--randomness</span></p>
<p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  Percentage chance that any given cell will be alive in the first iteration, between 0 and 100. Defaults to 50.
</p>`

const optDef = {
  '-r, --randomness': '<randomness>',
}

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Check if the correct number of arguments is given
  const {argv, options} = OptionParser.parseOptions(args, optDef)
  if (argv.length !== 2) {
    return {
      output: OutputFactory.makeErrorOutput({
        source: 'life',
        type: 'Game of life requires 2 arguments, width and height.'
      })
    }
  }

  // Ensure both arguments are valid numbers
  for (let arg of argv) {
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

  // Check the randomness factor
  if (options.randomness === undefined) {
    // Defaults to a 50% chance
    options.randomness = 50
  }
  const randomness: number = +options.randomness
  if (isNaN(randomness)) {
    return {
      output: OutputFactory.makeErrorOutput({
        source: 'life',
        type: `Randomness must be a number, but "${options.randomness}" is not a valid number.`
      })
    }
  }
  else if (randomness < 0 || randomness > 100) {
    return {
      output: OutputFactory.makeErrorOutput({
        source: 'life',
        type: `Randomness must be between 0 and 100 inclusive, received "${options.randomness}".`
      })
    }
  }

  // Create and return a div that the async function can use to put the canvas into.
  const divId = uuidv4()
  const div = `<div id="${divId}">Game of Life loading...</div>`
  gameOfLife(+argv[0], +argv[1], randomness / 100, divId)
  return {
    output: OutputFactory.makeTextOutput(div)
  }
}

// The actual function that will handle the game of life command
async function gameOfLife(width: number, height: number, randomness: number, divId: string) {
  // This function relies on the fact that the executor generates a div to put either or canvas or error into.
  try {
    const gameMod = await import('./rust/pkg/index')
    const universe = gameMod.Universe.new(width, height, randomness)

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
    animationInterval = window.setInterval(() => { loop(universe, ctx) }, 1000/6)

    // Scroll to the bottom again after adding the canvas
    document.body.scrollTo(0, document.body.scrollHeight)
  }
  catch (e) {
    document.getElementById(divId)!!.innerHTML = `<p class="red">Error when loading Game of Life: ${e}</p>`
    throw e
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
