// Compile all of the commands into an Array that will be used by the system
import { CD } from './cd'
import { Command } from './command'
import { LS } from './ls'
import { Help, Summary } from './help'

export const Commands: Array<Command> = [
  new Summary(),
  new CD(),
  new Help(),
  new LS(),
]

/**
 * Return the command that has the given name, or null if the name is invalid
 */
export function getCommand(name: string): Command | null {
  // TODO - When the commands array gets bigger, switch this to binary search instead of linear
  for(const cmd of Commands) {
    if (cmd.name === name) {
      return cmd
    }
  }
  return null
}
