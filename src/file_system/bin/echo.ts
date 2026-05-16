import { OutputType } from '@/interfaces/output'
import { BaseProgram } from '@/base_program'
import { useOutputsStore } from '@/stores/outputs'
import { h } from 'vue'

export default class Echo extends BaseProgram {
  name = 'echo'
  help = {
    summary: 'display a line of text',
    usage: 'echo [STRING]',
    description: ['echo displays STRING of text.'],
  }

  get prompt(): null {
    return null
  }

  async executeCommand(argv: string[], isCurrent: boolean): Promise<void> {
    const { writeOutput } = useOutputsStore()
    const output = argv.slice(1).join(' ')
    writeOutput({
      type: OutputType.output,
      content: output,
      prompt: this.prompt,
    })
  }

  keyboardInterrupt(): void {}
}
