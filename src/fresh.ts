// lib
import { Emulator, EmulatorState, HistoryKeyboardPlugin, OutputType } from 'javascript-terminal'
// local
import { Commands } from './commands'
import { Env } from './env'
import { FileSystem } from './file_system'

const HOME_PATH = Env.get('home')

export class Fresh {
  // Fresh is a class that handles the terminal stuff in a nice, neat way

  // Keep track of the history object being used in the terminal
  private history: HistoryKeyboardPlugin
  // Keep track of the instance's terminal emulator
  private terminal: Emulator
  // Also keep track of the changing state
  private state: EmulatorState

  // In terms of HTML elements, keep track of the necessary elements
  private inputElement: HTMLInputElement
  private outputContainer: HTMLElement
  private promptContainer: HTMLElement

  constructor() {
    // Create the terminal and the state
    this.terminal = new Emulator()
    this.state = EmulatorState.create({
      commandMapping: Commands,
      environmentVariables: Env,
      fs: FileSystem,
    })
    this.history = new HistoryKeyboardPlugin(this.state)

    // Fetch the necessary elements from the DOM
    this.inputElement = document.getElementById('input')! as HTMLInputElement
    this.outputContainer = document.getElementById('output-wrapper')!
    this.promptContainer = document.getElementById('prompt')!

    // Set up event listeners for the class
    this.setupListeners()
  }

  /**
   * Setup all of the necessary event listeners for the system
   */
  private setupListeners() {
    // Catch-all event listeners to catches clicks and taps on the screen and focus the input element
    // Still bubble up so we don't break anything
    window.addEventListener('click', () => { this.inputElement.focus() })
    window.addEventListener('touch', () => { this.inputElement.focus() })

    // Create a keypress listener on the input element for certain keys
    // Enter - Run command, Tab - Autocomplete, Up - History up, Down - History down
    this.inputElement.addEventListener('keydown', e => {
      switch (e.key) {
        case 'Enter':
          // Attempt to run the supplied command
          this.execute()
          break
        case 'Tab':
          // Update the current value of the input element
          this.tabComplete()
          // Prevent focus from being lost
          e.preventDefault()
          break
        case 'ArrowUp':
          // Scroll up through history
          this.input = this.history.completeUp()
          // Prevent the normal action of the up arrow to keep the cursor at the end of the line
          e.preventDefault()
          break
        case 'ArrowDown':
          // Scroll down through history
          this.input = this.history.completeDown()
          break
      }
    })
  }

  /**
   * Generate a prompt for the given working directory
   */
  private getPrompt(cwd: string): string {
    cwd = cwd.replace(HOME_PATH, '~')
    return `${cwd}&nbsp;>&nbsp;`
  }

  /**
   * Set the prompt to the current working directory, replacing the home path with the '~' sign
   */
  private setPrompt() {
    this.promptContainer.innerHTML = this.getPrompt(this.state.getEnvVariables().get('cwd'))
  }

  /**
   * Set the input
   */
  set input(value: string) {
    this.inputElement.value = value
  }

  /**
   * Get the current input value
   */
  get input(): string {
    return this.inputElement.value
  }

  /**
   * Execute the given command and display the output by rendering the outputs in the wrapper and clearing the prompt
   */
  private execute() {
    // Retrieve the command and clear the prompt
    const command = this.input
    this.input = ''

    // Also clear the output container
    this.outputContainer.innerHTML = ''

    // Execute the command and update the state value
    this.state = this.terminal.execute(this.state, command, [this.history])

    // Render each item in the outputs array, using map because for some reason it's the only thing that works
    this.state.getOutputs().map(output => this.render(output))

    // Update the prompt to the new cwd
    this.setPrompt()

    // Lastly, scroll to the end of the page
    document.body.scrollTo(0, document.body.scrollHeight)
  }

  /**
   * Handle tab completion by attempting to autocomplete the current input
   */
  private tabComplete() {
    // TODO - At a later stage, set up suggestions `this.terminal.suggest(this.state, this.input): string[]`
    this.input = this.terminal.autocomplete(this.state, this.input)
  }

  /**
   * Render a given output into the output container
   */
  private render(output: any) {
    const div = document.createElement('div')
    // If the output type is a HEADER_OUTPUT_TYPE, then it is a copy of our prompt
    if (output.type === OutputType.HEADER_OUTPUT_TYPE) {
      div.innerHTML = `${this.getPrompt(output.content.cwd)}${output.content.command}`
    }
    else if (output.type === OutputType.TEXT_ERROR_OUTPUT_TYPE) {
      div.innerHTML = `<div class="red">${output.content.replace('emulator:', 'fresh:')}</div>`
    }
    else {
      div.innerHTML = output.content
    }
    this.outputContainer.append(div)
  }
}
