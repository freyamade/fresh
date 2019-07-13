import { Fresh } from '../fresh'

export abstract class Command {
  // Keep track of the name of the command, which will be used to determine which Command class needs to be run
  readonly name: string = ''
  // Summary to be used for the `?` method
  readonly summary: string = ''
  // Description to be used for the `help` method
  readonly help: string = ''

  abstract execute(term: Fresh, args: string[]): void
}
