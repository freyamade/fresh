import hljsVuePlugin from '@highlightjs/vue-plugin'
import { h } from 'vue'

import '@/assets/highlights.scss'
import { BaseProgram } from '@/base_program'
import { FreshError } from '@/errors'
import { OutputType } from '@/interfaces/output'
import { useOutputsStore } from '@/stores/outputs'
import { useCurrentProgramStore } from '@/stores/current_program'
import useFileSystem from '@/plugins/file_system'

export default class Cat extends BaseProgram {
  name = 'cat'
  help = {
    summary: 'concatenate files and print on the standard output',
    usage: 'cat [OPTION]... [FILE]...',
    description: [
      'Concatenate FILE(s) to standard output.',
      'With no FILE, read standard input.',
      'FILE output(s) will be syntax-highlighted unless specified otherwise.',
    ],
  }
  options = [
    {
      flag: 'p',
      longFlag: 'plain',
      helpText: 'print file contents without colour',
      internalName: 'plain',
    },
  ]

  get prompt(): string | null {
    return null
  }

  /* Couple of different situations;
   *   1. Called from non-current context and passed no argv other than the command -> this program becomes the current application
   *   2. Called from non-current context and passed argv -> try to read the file(s) as defined by the input
   *   3. Called from current context -> return the argv
   */
  async handleInput(argv: string[], isCurrent: boolean): Promise<void> {
    const { writeOutput } = useOutputsStore()
    const parser = this.parser
    argv = parser.parse(argv)
    const skipColour = !!parser.plain?.value()

    // If called from the shell
    if (!isCurrent) {
      // No arguments; make this the current program
      if (argv.length === 1) {
        // Set the current program to this one
        const { pushProgram } = useCurrentProgramStore()
        pushProgram(this)
      } else {
        // Arguments; try to open each argument as a file
        const fileSystem = useFileSystem()
        for await (const fileName of argv.slice(1)) {
          try {
            const contents = await fileSystem.read(fileName)
            if (contents != null) {
              if (skipColour) {
                for (const line of contents.trim().split('\n')) {
                  writeOutput({
                    type: OutputType.asIs,
                    content: line,
                    prompt: this.prompt,
                  })
                }
              } else {
                writeOutput({
                  type: OutputType.jsx,
                  prompt: this.prompt,
                  content: h(hljsVuePlugin.component, {
                    language: fileName.split('.').pop(),
                    code: contents.trim(),
                  }),
                })
              }
            }
          } catch (e) {
            if (e instanceof FreshError) {
              writeOutput({
                type: OutputType.error,
                content: `cat: ${e.message}`,
                prompt: this.prompt,
              })
            } else {
              throw e
            }
          }
        }
      }
    } else {
      // Current program; print out the supplied argv
      writeOutput({ type: OutputType.output, content: argv.join(' '), prompt: this.prompt })
    }
  }

  keyboardInterrupt(): void {
    // Cat should pop itself on interrupt
    const { popProgram } = useCurrentProgramStore()
    const { writeOutput } = useOutputsStore()
    writeOutput({ type: OutputType.output, content: '^C⏎', prompt: this.prompt })
    popProgram()
  }
}
