<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import { OutputType } from '@/interfaces/output'
import { useCurrentProgramStore } from '@/stores/current_program'
import { useOutputsStore } from '@/stores/outputs'
import { useHistoryStore } from './stores/history'
import useFileSystem from './plugins/file_system'
import { useEnvStore } from './stores/env'

// Stored Data
const programStore = useCurrentProgramStore()
const { currentProgram } = storeToRefs(programStore)
const outputsStore = useOutputsStore()
const { outputs } = storeToRefs(outputsStore)
const { appendHistory, historyBack, historyForward } = useHistoryStore()
const { expandVariables } = useEnvStore()
const fileSystem = useFileSystem()

const inputField = useTemplateRef('commandInput')
const currentInput = ref<string>('')
const inputSuggestions = ref<string[]>([])

function handleKeydown(e: KeyboardEvent): void {
  // TODO - Pass this off to the current program
  // Regardless of what gets pressed, we should clear the current suggestions
  inputSuggestions.value = []
  let historyInput

  switch (e.key) {
    case 'Enter':
      // Attempt to run the supplied command
      executeCommand()
      break
    case 'Tab':
      // Update the current value of the input element
      doTabCompletion()
      // Prevent focus from being lost
      e.preventDefault()
      break
    case 'ArrowUp':
      // Scroll up through history
      historyInput = historyBack()
      if (historyInput != null) currentInput.value = historyInput
      // Prevent the normal action of the up arrow to keep the cursor where it is
      e.preventDefault()
      break
    case 'ArrowDown':
      // Scroll down through history
      historyInput = historyForward()
      if (historyInput != null) currentInput.value = historyInput
      // Prevent the normal action of the up arrow to keep the cursor where it is
      e.preventDefault()
      break
    // Implement some neat form of keybind management
    case 'd':
      // If Ctrl+D then we need to pop the current program
      if (e.ctrlKey) {
        e.preventDefault()
        outputsStore.writeOutput({ type: OutputType.output, content: '\xa0', prompt: null })
        programStore.popProgram()
      }
      break
    case 'c':
      if (e.ctrlKey) {
        e.preventDefault()
        currentProgram.value?.keyboardInterrupt()
        currentInput.value = ''
      }
      break
  }
}

async function executeCommand() {
  if (currentInput.value === '') return
  currentInput.value = currentInput.value.trim()

  // Add the newly run command to the history and the screen
  appendHistory(currentInput.value)
  outputsStore.writeOutput({
    type: OutputType.output,
    content: currentInput.value,
    prompt: currentProgram.value?.prompt || null,
  })

  // Pass the argument to the currently running program after expanding out the environent variables
  const expandedInput = expandVariables(currentInput.value)
  await currentProgram.value?.handleInput(expandedInput.split(' '), true)

  // Then clear the field
  currentInput.value = ''
  focusInput()
}

function focusInput() {
  inputField.value?.focus()
}

function doTabCompletion() {
  if (currentInput.value === '') return

  const { all, filtered, autocomplete } = fileSystem.suggestCompletions(currentInput.value)

  if (autocomplete != null) {
    currentInput.value = autocomplete
  } else if (filtered.length === 0) {
    // If filtered suggestions are empty, show all of them instead
    inputSuggestions.value = all
  } else {
    inputSuggestions.value = filtered
  }
}

onMounted(() => {
  focusInput()
  window.addEventListener('click', focusInput)
  window.addEventListener('touch', focusInput)
  outputsStore.$subscribe(() =>
    nextTick(() => {
      document.body.scrollTo(0, document.body.scrollHeight)
    }),
  )
})
</script>

<template>
  <div id="output-wrapper">
    <template v-for="(output, i) in outputs" v-bind:key="`output-${i}`">
      <div :class="{ red: output.type === OutputType.error }" class="output-container">
        <span class="prompt" v-if="output.prompt != null">
          &nbsp;{{ output.prompt }}&nbsp;<span class="prompt-cap">&nbsp;</span></span
        >
        <component v-if="output.type === OutputType.jsx" :is="output.content"></component>
        <span v-else-if="output.type !== OutputType.asIs">{{ output.content }}</span>
        <pre v-else>{{ output.content }}</pre>
      </div>
    </template>
  </div>

  <div class="input-wrapper">
    <span class="prompt" id="input-prompt" v-if="currentProgram?.prompt != null">
      &nbsp;{{ currentProgram.prompt }}&nbsp;<span class="prompt-cap">&nbsp;</span>
    </span>
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
