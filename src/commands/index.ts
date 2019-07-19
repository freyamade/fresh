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
  'printenv': PrintEnv,
  'pwd':      PWD,
  'whoami':   WhoAmI,
})
