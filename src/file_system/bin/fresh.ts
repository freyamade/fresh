import { BaseProgram } from '@/base_program'
import { OutputType } from '@/interfaces/output'
import { useCurrentProgramStore } from '@/stores/current_program'
import { useOutputsStore } from '@/stores/outputs'
import useFileSystem from '@/plugins/file_system'
import { FreshError } from '@/errors'

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

  get prompt(): string | null {
    const fileSystem = useFileSystem()
    return fileSystem.shellPrompt
  }

  async handleInput(argv: string[], isCurrent: boolean): Promise<void> {
    const { writeOutput } = useOutputsStore()

    const command = argv[0]!
    try {
      const fileSystem = useFileSystem()
      const program = await fileSystem.run(command)
      if (program.name === this.name) {
        const { pushProgram } = useCurrentProgramStore()
        pushProgram(program)
      } else {
        await program.handleInput(argv, false)
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

  keyboardInterrupt(): void {
    // Shell does nothing for keyboard interrupt
  }
}
