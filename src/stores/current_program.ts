import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { BaseProgram } from '@/base_program'
import Fresh from '@/file_system/bin/fresh'
import { useOutputsStore } from '@/stores/outputs'
import { OutputType } from '@/interfaces/output'

export const useCurrentProgramStore = defineStore('currentProgram', () => {
  const startingShell = new Fresh()
  const programStack = ref<BaseProgram[]>([startingShell])
  const currentProgram = computed(() => programStack.value[programStack.value.length - 1])

  function pushProgram(prog: BaseProgram) {
    programStack.value.push(prog)
  }

  function popProgram() {
    programStack.value.pop()
    if (programStack.value.length === 0) {
      const { writeOutput } = useOutputsStore()
      writeOutput({ type: OutputType.error, content: 'Restarting fresh', prompt: null })
      pushProgram(new Fresh())
    }
  }
  return { currentProgram, pushProgram, popProgram }
})
