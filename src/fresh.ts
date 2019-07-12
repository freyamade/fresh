import { Terminal } from 'xterm'
import { IBuffer } from 'xterm/src/Types'
import { fit } from 'xterm/lib/addons/fit/fit'

export default class Fresh extends Terminal {
  /**
   * Create a new Fresh instance, which supplies the default parameters to the super constructor
   */
  constructor() {
    super({fontFamily: 'Source Code Pro', fontSize: 16, theme: {background: '#18191c', foreground: '#fff'}})
    this.open(document.getElementById('terminal')!);
    fit(this);

    // Add a key listener to handle button presses
    this.on('key', (key: string, event: KeyboardEvent) => { this.handleKeypress(key, event) });

    // Also add an event listener to resize the terminal if the window is resized
    window.addEventListener('resize', () => { fit(this) }, false)
  }
  /**
   * Retrieves the string used for the prompt for the shell
   */
  get prompt(): string {
    return '/freyama.de > '
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
        this.newline()
        this.writePrompt()
        break
      case 8:
        // Backspace, delete a character (ensuring not to delete the prompt)
        // the `as any` is a workaround because right now the `x` and `y` fields are not in the typings file
        if (this.x > this.prompt.length) {
          this.write('\b \b');
        }
        break
      // TODO - Add other keys, like arrow key handling
      default:
        // If the key pressed was printable, print it
        if (printable) {
          this.write(key)
        }
    }
  }

  /**
   * Write out the prompt with some extra formatting to the terminal
   */
  writePrompt() {
    this.write(`\x1B[1m${this.prompt}\x1B[0m`)
  }

  /**
   * Execute the current line as a command
   */
  execute() {
    let command = this.getCommand()
    this.newline()
    this.write(`execute("${command}")`)
    // Remove the prompt from the command, then pass it into the radix tree (TODO)
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
      command = line + command
      y--
    }
    // `line` still contains the line with the prompt in it, so we need to add that line to the command
    // Remove the prompt from the line before adding it
    command = line.replace(this.prompt, '') + command
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
