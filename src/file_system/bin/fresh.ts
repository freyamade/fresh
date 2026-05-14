import { BaseProgram } from '@/base_program'
import { OutputType } from '@/interfaces/output'
import { useCurrentProgramStore } from '@/stores/current_program'
import { useOutputsStore } from '@/stores/outputs'
import useFileSystem from '@/plugins/file_system'
import { FreshError } from '@/errors'
import { h, type VNode } from 'vue'
import type { HandledKeypressEvent } from '@/interfaces/events'
import { useHistoryStore } from '@/stores/history'

export default class Fresh extends BaseProgram {
  name = 'fresh'
  help = {
    summary: 'freyama.de shell',
    usage: 'fresh',
    description: [
      'The custom built shell emulation for the personal website of Freya Madeline Broderick.',
      'It is developed in Vue3 using Typescript, and all commands are real Typescript files contained within the "/bin" folder and loaded in real time.',
      'Commands can be run using absolute paths (`/bin/help.ts`), by or specifying the file name, with or without the ".ts" extension (`help.ts` or `help` both work).',
    ],
  }

  get prompt(): VNode {
    const fileSystem = useFileSystem()
    return h('span', [
      h('span', {
        class: 'prompt-path',
        innerHTML: `&nbsp;${fileSystem.currentDirForPrompt}&nbsp;`,
      }),
      h('span', { class: 'prompt-cap', innerHTML: '&nbsp;' }),
    ])
  }

  async executeCommand(argv: string[], isCurrent: boolean): Promise<void> {
    if (argv.length === 1 && argv[0] === '') return
    const { writeOutput } = useOutputsStore()

    const command = argv[0]!
    try {
      const fileSystem = useFileSystem()
      const program = await fileSystem.run(command)
      if (program.name === this.name) {
        const { pushProgram } = useCurrentProgramStore()
        pushProgram(program)
      } else {
        await program.executeCommand(argv, false)
      }
    } catch (e) {
      if (e instanceof FreshError) {
        writeOutput({
          type: OutputType.error,
          content: `fresh: ${e.message}`,
          prompt: null,
        })
      } else {
        throw e
      }
    }
  }

  handleKeypress(
    event: KeyboardEvent,
    currentInput: string,
    currentSuggestions: string[],
  ): HandledKeypressEvent {
    // Handle stuff like Tab, ArrowUp/Down
    if (event.key === 'Tab') {
      event.preventDefault()
      return this.handleTabCompletion(currentInput, currentSuggestions)
    }
    if (event.key.startsWith('Arrow')) {
      const { historyBack, historyForward } = useHistoryStore()
      let getter: () => string | null = () => null
      if (event.key === 'ArrowUp') {
        getter = historyBack
        event.preventDefault()
      } else if (event.key === 'ArrowDown') {
        getter = historyForward
        event.preventDefault()
      }

      const historyInput = getter()
      if (historyInput != null) {
        return { input: historyInput }
      }
    }
    return {}
  }

  private handleTabCompletion(
    currentInput: string,
    currentSuggestions: string[],
  ): HandledKeypressEvent {
    const fileSystem = useFileSystem()

    const { all, filtered, autocomplete } = fileSystem.suggestCompletions(currentInput)

    if (autocomplete != null) {
      return { input: autocomplete }
    } else if (filtered.length === 0) {
      // If filtered suggestions are empty, show all of them instead
      return { suggestions: all }
    } else {
      return { suggestions: filtered }
    }
  }
}
