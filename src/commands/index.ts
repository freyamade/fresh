// Set up a command mapping, from our command classes to commands as they work in the terminal library
// lib
import { CommandMapping, OutputFactory } from 'javascript-terminal'
// local
import { Cat } from './cat'
import { CD } from './cd'
import { Clear } from './clear'
import { Help } from './help'
import { Summary } from './summary'

// This is not automatically ordered, need to keep track of ordering myself
export const Commands = CommandMapping.create({
  '?':     Summary,
  'cat':   Cat,
  'cd':    CD,
  'clear': Clear,
  'help':  Help,
})
