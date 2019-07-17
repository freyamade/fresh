// Set up a command mapping, from our command classes to commands as they work in the terminal library

import { CommandMapping, OutputFactory } from 'javascript-terminal'

export const Commands = CommandMapping.create({
  'test': {
    'function': (state, opts) => {
      console.log(state.getCommandMapping().valueSeq().get(0).get('help'))
      return {output: OutputFactory.makeTextOutput('test')}
    },
    optDef: {},
    help: 'This is the help message for the test function.'
  }
})
