<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import Prompt from './prompt.vue'
import { OutputType } from '@/interfaces/output'
import { useCurrentProgramStore } from '@/stores/current_program'
import { useOutputsStore } from '@/stores/outputs'
import { useHistoryStore } from '@/stores/history'
import { useEnvStore } from '@/stores/env'

// Stored Data
const programStore = useCurrentProgramStore()
const { currentProgram } = storeToRefs(programStore)
const outputsStore = useOutputsStore()
const { appendHistory } = useHistoryStore()
const { expandVariables } = useEnvStore()

// Expose the execution command for testing / generation of NoJS page
defineExpose({ executeCommand })

const inputField = useTemplateRef('commandInput')
const currentInput = ref<string>('')
const inputSuggestions = ref<string[]>([])

function handleKeydown(event: KeyboardEvent): void {
  // Some stdin-level handling of some special characters
  switch (event.key) {
    case 'Enter':
      event.preventDefault()

      // Pass the input to the current program for execution
      const command = currentInput.value.trim()
      executeCommand(command)
      // Clear the input
      currentInput.value = ''
      focusInput()

      return
    case 'd':
      // If Ctrl+D then we need to pop the current program
      if (event.ctrlKey) {
        outputsStore.writeOutput({ type: OutputType.output, content: '\xa0', prompt: null })
        programStore.popProgram()
        event.preventDefault()
        return
      }
    case 'c':
      if (event.ctrlKey) {
        currentProgram.value?.keyboardInterrupt()
        currentInput.value = ''
        event.preventDefault()
        return
      }
  }
  // Otherwise, pass the event to the current program and let it handle it
  const handledKeypress =
    currentProgram.value?.handleKeypress(event, currentInput.value, inputSuggestions.value) || {}
  if (handledKeypress.input) {
    currentInput.value = handledKeypress.input
  }
  inputSuggestions.value = handledKeypress.suggestions || [] // clear the suggestions if none are returned
}

async function executeCommand(command: string) {
  // Add the newly run command to the history and the screen
  appendHistory(command)
  outputsStore.writeOutput({
    type: OutputType.output,
    content: command,
    prompt: currentProgram.value?.prompt || null,
  })

  // Pass the argument to the currently running program after expanding out the environent variables
  const expandedInput = expandVariables(command)

  // Split out comments
  const commentlessInput = expandedInput.split('#')[0]!.trim()
  await currentProgram.value?.executeCommand(commentlessInput.split(' '), true)
}

function focusInput() {
  inputField.value?.focus()
}

onMounted(() => {
  focusInput()
  window.addEventListener('click', focusInput)
  window.addEventListener('touch', focusInput)
})
</script>

<template>
  <div class="input-wrapper">
    <Prompt :prompt="currentProgram?.prompt" id="input-prompt" />
    <input
      ref="commandInput"
      v-model="currentInput"
      id="input"
      type="text"
      autofocus
      autocomplete="off"
      aria-label="Command To Run"
      v-on:keydown="handleKeydown"
    />
  </div>
  <div id="suggestions" class="yellow">
    <span v-for="suggestion in inputSuggestions" :key="`suggestion-${suggestion}`">{{
      suggestion
    }}</span>
  </div>
</template>

<style scoped></style>
