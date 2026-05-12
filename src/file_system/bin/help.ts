import { BaseProgram } from '@/base_program'
import { FreshError } from '@/errors'
import { OutputType } from '@/interfaces/output'
import useFileSystem from '@/plugins/file_system'
import { useOutputsStore } from '@/stores/outputs'
import { h } from 'vue'

const websiteHelpText = h('div', [
  h('p', [
    h('span', { class: 'magenta', innerHTML: 'freyama.de' }),
    h('span', { innerHTML: '&nbsp;-&nbsp;The homepage of Freya Madeline Broderick.' }),
  ]),
  h('br'),
  h('p', {
    innerHTML:
      'Built to resemble a terminal, it is fully interactive and contains all of the usual things a personal website would contain, plus maybe some easter eggs!',
  }),
  h('p', [
    h('span', { innerHTML: 'For a list of available commands, run ' }),
    h('span', { class: 'yellow', innerHTML: '`ls /bin`' }),
    h('span', { innerHTML: '.' }),
  ]),
  h('p', [
    h('span', { innerHTML: 'For more information, run ' }),
    h('span', { class: 'yellow', innerHTML: '`help help`' }),
    h('span', { innerHTML: '.' }),
  ]),
  h('br'),
  h('p', { class: 'green' }, [
    h('span', { innerHTML: 'Github&nbsp;-&nbsp;' }),
    h('a', {
      href: 'https://github.com/freyamade/fresh',
      innerHTML: 'https://github.com/freyamade/fresh',
    }),
    h('span', { innerHTML: '.' }),
  ]),
])

export default class HelpProgram extends BaseProgram {
  name = 'help'
  help = {
    summary: 'get usage information for commands',
    usage: 'help [COMMAND]',
    description: [
      'Displays summaries, descriptions and usage information for COMMAND (like the one you are currently reading!)',
      'If no COMMAND, displays help text for the website instead.',
    ],
  }

  get prompt(): string | null {
    return null
  }

  async handleInput(argv: string[], isCurrent: boolean): Promise<void> {
    const { writeOutput } = useOutputsStore()
    // If argv is empty, print out the website help text vnode
    if (argv.length === 1)
      writeOutput({ type: OutputType.jsx, content: websiteHelpText, prompt: null })
    else if (argv.length === 2) {
      // Try to load the bin
      const fileSystem = useFileSystem()
      try {
        const program = await fileSystem.run(argv[1]!)
        /*
         * yellow({name} - {help.summary})
         *
         *
         * Usage
         *     green({help.usage})
         *
         * Description
         *     {help.description}
         *
         * Options:
         *     blue(flag, longFlag)
         *         helpText
         */
        const children = [
          h('p', { class: 'yellow', innerHTML: `${program.name} - ${program.help.summary}` }),
          h('br'),
          h('p', { innerHTML: 'Usage:' }),
          h('p', { class: ['green', 'tab'], innerHTML: program.help.usage }),
          h('br'),
          h('p', { innerHTML: 'Description:' }),
          ...program.help.description.map((line) =>
            h('p', { class: ['tab', 'yellow'], innerHTML: line }),
          ),
        ]
        if (program.options.length) {
          children.push(
            h('br'),
            h('p', { innerHTML: 'Options:' }),
            ...program.options
              .map((option) => {
                return [
                  h('p', {
                    class: ['blue', 'tab'],
                    innerHTML:
                      option.longFlag == null
                        ? `-${option.flag}`
                        : `-${option.flag}, --${option.longFlag}`,
                  }),
                  h('p', { class: 'double-tab', innerHTML: option.helpText }),
                  h('br'),
                ]
              })
              .flat(),
          )
        }
        writeOutput({
          type: OutputType.jsx,
          content: h('div', { class: 'help' }, children),
          prompt: this.prompt,
        })
      } catch (e) {
        if (e instanceof FreshError) {
          writeOutput({
            type: OutputType.error,
            content: `help: ${e.message}`,
            prompt: this.prompt,
          })
        } else {
          throw e
        }
      }
    } else {
      writeOutput({
        type: OutputType.error,
        content: `help: expected 0 or 1 arguments, got ${argv.length - 1}`,
        prompt: this.prompt,
      })
    }
  }

  keyboardInterrupt(): void {}
}
