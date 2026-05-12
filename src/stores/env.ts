import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FreshError } from '@/errors'

const declarationPattern = /[a-zA-Z_][a-zA-Z0-9]*/
const substitutionPattern = /\$([a-zA-Z_][a-zA-Z0-9]*)/g

export const useEnvStore = defineStore('env', () => {
  const envVars = ref<Record<string, string>>({
    HOME: '/freyama.de',
    USERNAME: 'freya',
    SHELL: '/bin/fresh.ts',
  })

  function expandVariables(input: string): string {
    for (const [toReplace, varName] of input.matchAll(substitutionPattern)) {
      const varValue = envVars.value[varName!] || ''
      console.log('replacing', toReplace, 'with', varValue)
      input = input.replace(toReplace, varValue)
    }
    return input
  }

  function getVarsForCompletions(): string[] {
    return Object.keys(envVars.value).map((varName) => `$${varName}`)
  }

  function setVar(varName: string, varValue: string) {
    if (!varName.match(declarationPattern)) {
      throw new FreshError(
        'variable names may only use letters, numbers, and underscores, and cannot start with numbers',
      )
    }
    envVars.value[varName] = varValue
  }

  return { envVars, expandVariables, getVarsForCompletions, setVar }
})
