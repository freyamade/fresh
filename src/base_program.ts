import OptionParser from 'option-parser'
import type { Option } from '@/interfaces/option'
import type { Help } from '@/interfaces/help'

export abstract class BaseProgram {
  name: string = 'none'
  help: Help = { summary: 'none', usage: 'none', description: ['none'] }
  options: Option[] = []

  abstract get prompt(): string | null
  abstract handleInput(argv: string[], isCurrent: boolean): Promise<void>
  abstract keyboardInterrupt(): void

  get parser(): OptionParser {
    const parser = new OptionParser()
    parser.programName(this.name)
    for (const opt of this.options) {
      parser.addOption(opt.flag, opt.longFlag, opt.helpText, opt.internalName)
    }
    return parser
  }
}
