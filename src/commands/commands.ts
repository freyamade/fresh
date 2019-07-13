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
