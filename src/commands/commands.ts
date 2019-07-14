// Compile all of the commands into an Array that will be used by the system
import { Cat } from './cat'
import { CD } from './cd'
import { Command } from './command'
import { Help, Summary } from './help'
import { LS } from './ls'
import { PWD } from './pwd'
import { WhoAmI } from './whoami'

export const Commands: Array<Command> = [
  new Summary(),
  new Cat(),
  new CD(),
  new Help(),
  new LS(),
  new PWD(),
  new WhoAmI(),
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
