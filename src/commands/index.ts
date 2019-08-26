// Set up a command mapping, from our command classes to commands as they work in the terminal library
// lib
import { CommandMapping, OutputFactory } from 'javascript-terminal'
// local
import { Cat } from './cat'
import { CD } from './cd'
import { Clear } from './clear'
import { Help } from './help'
import { History } from './history'
import { LS } from './ls'
import { PKG } from './pkg'
import { PrintEnv } from './print_env'
import { PWD } from './pwd'
import { Summary } from './summary'
import { WhoAmI } from './whoami'

// This is not automatically ordered, need to keep track of ordering myself
export const Commands = CommandMapping.create({
  '?':        Summary,
  'cat':      Cat,
  'cd':       CD,
  'clear':    Clear,
  'help':     Help,
  'history':  History,
  'ls':       LS,
  'pkg':      PKG,
  'printenv': PrintEnv,
  'pwd':      PWD,
  'whoami':   WhoAmI,
})

// Add a commands interface to the window.
// This will allow for installation of further commands by adding to this map later.
declare global {
  interface Window { commands: CommandMapping; }
}
window.commands = Commands
