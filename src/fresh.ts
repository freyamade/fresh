// lib
import { Terminal } from 'xterm'
import { fit } from 'xterm/lib/addons/fit/fit'
// local
import { Commands } from './commands/commands'
import { FileSystem, Home } from './file_system/file_system'
import { Directory } from './file_system/directory'
import { Settings } from './settings'

const HOME_PATH = Home.toString()

export class Fresh extends Terminal {
  private header = '\x1b[35mfreyama.de\x1b[0m - \x1b[34mv2019.07.12\x1b[0m'
  private intro = 'Run \x1b[33m`?`\x1b[0m for a list of available commands.'
  private _cwd: Directory = Home
  /**
   * Create a new Fresh instance, which supplies the default parameters to the super constructor
   */
  constructor() {
    super(Settings)
    this.open(document.getElementById('terminal')!);
    fit(this);

    // Add a key listener to handle button presses
    this.on('key', (key: string, event: KeyboardEvent) => { this.handleKeypress(key, event) });

    // Also add an event listener to resize the terminal if the window is resized
    window.addEventListener('resize', () => { fit(this) }, false)

    // Write out the header line and prepare the prompt
    this.writeln(this.header)
    this.writeln(this.intro)
    this.newline()
    this.writePrompt()
    this.focus()
  }
  /**
   * Retrieves the string used for the prompt for the shell
   */
  get prompt(): string {
    return `${this._cwd.toString().replace(HOME_PATH, '~')} > `
  }

  get cwd(): Directory {
    return this._cwd
  }

  set cwd(dir: Directory) {
    // When changing dir, write a newline
    this.newline()
    this._cwd = dir
  }

  /**
   * Helper method for adding a new line to the terminal
   */
  newline() {
    this.write('\r\n')
  }

  /**
   * Handle incoming keypresses
   */
  handleKeypress(key: string, event: KeyboardEvent) {
    // Determine if the button pressed is printable
    const printable = !event.altKey && !event.ctrlKey && !event.metaKey

    // Handle different events depending on the keycode of the button pressed
    switch (event.keyCode) {
      case 13:
        // Enter Key, try and run commands
        this.execute()
        this.writePrompt()
        break
      case 8:
        // Backspace, delete a character (ensuring not to delete the prompt)
        // the `as any` is a workaround because right now the `x` and `y` fields are not in the typings file
        if (this.x > this.prompt.length) {
          this.backspace();
        }
        break
      case 37: // Left
      case 38: // Up
      case 39: // Right
      case 40: // Down
        // For now, disable arrow key use
        break
      default:
        // If the key pressed was printable, print it
        if (printable) {
          this.write(key)
        }
    }
  }

  /**
   * Helper method for logging error messages
   */
  logError(message: string) {
    this.newline()
    this.write(`\x1b[31m${message}\x1b[0m`)
    this.newline()
  }

  /**
   * Write out the prompt with some extra formatting to the terminal
   */
  writePrompt() {
    this.write(`\r\x1B[1m${this.prompt}\x1B[0m`)
  }

  /**
   * Execute the current line as a command
   */
  execute() {
    let argv = this.getCommand().split(' ')
    let command = argv.shift()
    if (command === '') {
      return
    }

    // Try and find the right command to run
    let found = false
    Commands.forEach((cmd) => {
      if (command === cmd.name) {
        cmd.execute(this, argv)
        found = true
        return
      }
    })
    if (!found) {
      this.logError(`fresh: Invalid command '${command}'`)
    }
  }

  /**
   * Method that inserts a backspace
   */
  backspace() {
    this.write('\b \b')
  }

  /**
   * Temporary clear method
   */
  clear() {
    // Firstly, run the normal clear method
    super.clear()
    // Now, while the line is longer than the prompt, go back one character
    const backspaces = this.x - this.prompt.length
    for (let i = 0; i < backspaces; i++) {
      this.backspace()
    }
  }

  /**
   * Parse the terminal window for the command by going back up through the lines until we find the prompt
   */
  private getCommand(): string {
    let y = this.y
    let command = ''
    let line = ''
    while (y >= 0 && (line = this.buffer.getLine(y)!.translateToString()).indexOf(this.prompt) === -1) {
      // Add line on in front of the command since we're going backwards
      command = `${line}${command}`
      y--
    }
    // `line` still contains the line with the prompt in it, so we need to add that line to the command
    // Remove the prompt from the line before adding it
    command = `${line.replace(this.prompt, '')}${command}`
    // Trim whitespace from the string and return it
    return command.trim()
  }

  /**
   * A sadly necessary workaround to access the current x position of the buffer.
   * I have no idea why this isn't accessible through the Terminal class or something
   */
  private get x(): number {
    return (this.buffer as any)._buffer.x
  }

  /**
   * A sadly necessary workaround to access the current y position of the buffer.
   * I have no idea why this isn't accessible through the Terminal class or something
   */
  private get y(): number {
    return (this.buffer as any)._buffer.y
  }
}
