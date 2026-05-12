import { OutputType } from '@/interfaces/output'
import { BaseProgram } from '@/base_program'
import { useOutputsStore } from '@/stores/outputs'
import useFileSystem from '@/plugins/file_system'

export default class CD extends BaseProgram {
  name = 'cd'
  help = {
    summary: 'change directory',
    usage: 'cd [DIRECTORY]',
    description: [
      'If DIRECTORY is given, it will become the new directory. If no parameter is given, the HOME environment variable will be used.',
      'DIRECTORY can also a "-" character, which will instead return you to the previous directory visited, if one exists.',
    ],
  }

  get prompt(): string | null {
    return null
  }

  async handleInput(argv: string[], isCurrent: boolean): Promise<void> {
    const fileSystem = useFileSystem()
    switch (argv.length) {
      case 1:
        // Call the CD command with null as the chosen path
        fileSystem.changeDirectory(null)
        break
      case 2:
        // Call the CD command with the passed path
        fileSystem.changeDirectory(argv[1]!)
        break
      default:
        // Throw error
        const { writeOutput } = useOutputsStore()
        writeOutput({
          type: OutputType.error,
          content: `cd: Too many arguments`,
          prompt: this.prompt,
        })
    }
  }

  keyboardInterrupt(): void {}
}
