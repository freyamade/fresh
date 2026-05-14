import { BaseProgram } from '@/base_program'
import { OutputType } from '@/interfaces/output'
import { useOutputsStore } from '@/stores/outputs'
import { useHistoryStore } from '@/stores/history'
import { h } from 'vue'

export default class History extends BaseProgram {
  name = 'history'
  help = {
    summary: 'show or clear command history',
    usage: 'history ',
    description: [
      'List the commands previously run during the current visit to the webpage.',
      'Alternatively, the history can be prematurely cleared using the -c flag.',
    ],
  }
  options = [
    {
      flag: 'c',
      longFlag: 'clear',
      helpText: 'clear the existing history',
      internalName: 'clear',
    },
  ]

  get prompt(): null {
    return null
  }

  async executeCommand(argv: string[], isCurrent: boolean): Promise<void> {
    const { clear, commandHistory } = useHistoryStore()
    const { writeOutput } = useOutputsStore()
    const parser = this.parser
    parser.parse(argv)
    const shouldClear = !!parser.clear?.value()

    if (shouldClear) clear()
    else {
      // Create and return a table of history
      const rows = commandHistory.map((item, index) =>
        h('tr', [h('td', { innerHTML: index + 1 }), h('td', { innerHTML: item })]),
      )
      const table = h('table', { class: 'columned-table' }, [h('tbody', rows)])
      writeOutput({
        type: OutputType.jsx,
        content: table,
        prompt: null,
      })
    }
  }

  keyboardInterrupt(): void {
    // Shell does nothing for keyboard interrupt
  }
}
