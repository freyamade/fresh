import OptionParser from 'option-parser'
import type { Option } from '@/interfaces/option'
import type { Help } from '@/interfaces/help'
import type { HandledKeypressEvent } from './interfaces/events'
import type { VNode } from 'vue'

export abstract class BaseProgram {
  name: string = 'none'
  help: Help = { summary: 'none', usage: 'none', description: ['none'] }
  options: Option[] = []

  abstract get prompt(): VNode | null
  abstract executeCommand(argv: string[], isCurrent: boolean): Promise<void>

  get parser(): OptionParser {
    const parser = new OptionParser()
    parser.programName(this.name)
    for (const opt of this.options) {
      parser.addOption(opt.flag, opt.longFlag, opt.helpText, opt.internalName)
    }
    return parser
  }

  handleKeypress(
    event: KeyboardEvent,
    currentInput: string,
    currentSuggestions: string[],
  ): HandledKeypressEvent {
    // Default behaviour is to change nothing about a keypress event
    return {}
  }

  keyboardInterrupt(): void {}
}
