import * as Terminal from 'javascript-terminal'

// Create our custom filesystem
const fs = Terminal.FileSystem.create({
  '/': {canModify: false},
  '/freyama.de': {},
  '/freyama.de/projects': {},
  '/freyama.de/projects/crcophony': {
    content: `<p># <span class="yellow underline">crcophony</span></p>
    <p>A Terminal UI for Discord written in Crystal.</p>
    <br />
    <p><span class="green">GitHub - <span class="underline">https://github.com/freyamade/crcophony</span></span>`
  },
})

const emulator = new Terminal.Emulator()
let emulatorState = Terminal.EmulatorState.create({fs})

// Get the necessary elements
const inputElement = document.getElementById('input')! as HTMLInputElement
const outputElement = document.getElementById('output-wrapper')!
const prompt = document.getElementById('prompt')!

// Add event listeners to give focus to the input element
window.addEventListener('click', () => { inputElement.focus() }, false)
window.addEventListener('touch', () => { inputElement.focus() }, false)

// Set the text of the prompt
prompt.innerHTML = `${emulatorState.getEnvVariables().get('cwd')} >&nbsp;`

inputElement.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const command = inputElement.value
    inputElement.value = ''
    outputElement.innerHTML = ''
    // Execute the sent command and generate the outputs
    emulatorState = emulator.execute(emulatorState, command, [])
    // Display the outputs
    const outputNodes = emulatorState.getOutputs().map(output => {
      const div = document.createElement('div')
      div.className = output.type
      if (output.type !== Terminal.OutputType.HEADER_OUTPUT_TYPE) {
        div.innerHTML = output.content
      }
      else {
        div.innerHTML = `${output.content.cwd} > ${output.content.command}`
      }
      outputElement.append(div)
    })

    // Reset the prompt
    prompt.innerHTML = `${emulatorState.getEnvVariables().get('cwd')} >&nbsp;`
  }
}, false)
