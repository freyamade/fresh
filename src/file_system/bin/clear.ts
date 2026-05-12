import { BaseProgram } from '@/base_program'
import { useOutputsStore } from '@/stores/outputs'

export default class Clear extends BaseProgram {
  name = 'clear'
  help = {
    summary: 'clear the terminal screen',
    usage: 'clear',
    description: ['Clears all terminal outputs from the screen.'],
  }

  get prompt(): string | null {
    return null
  }

  async handleInput(argv: string[], isCurrent: boolean): Promise<void> {
    const { clear } = useOutputsStore()
    clear()
  }

  keyboardInterrupt(): void {}
}
