// Compile all of the commands into an Array that will be used by the system
import { CD } from './cd'
import { Command } from './command'

export const Commands: Array<Command> = [
  new CD(),
]
