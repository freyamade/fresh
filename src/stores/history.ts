import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHistoryStore = defineStore('history', () => {
  const commandHistory = ref<string[]>([])
  let historyIndex = 0 // Index for current history item, 0 is the furthest back and length is the max it can scroll down to, being empty

  function appendHistory(command: string) {
    commandHistory.value.push(command)
    historyIndex = commandHistory.value.length
  }

  function historyBack(): string | null {
    // easy handling of no history
    if (commandHistory.value.length === 0) return null

    // decrement the historyIndex, capping at 0
    historyIndex = Math.max(historyIndex - 1, 0)
    if (historyIndex >= 0) {
      return commandHistory.value[historyIndex]!
    }
    return null
  }

  function historyForward(): string | null {
    // easy handling of no history
    if (commandHistory.value.length === 0) return null

    // handle special case; when we first arrive to the length of the list we should return empty string so we empty the history inputs
    // but don't return it every time because we don't want to clear our input with down arrow
    if (historyIndex === commandHistory.value.length - 1) {
      historyIndex++
      return ''
    }

    // increment the historyIndex, capping at the length of the list
    historyIndex = Math.min(historyIndex + 1, commandHistory.value.length)
    if (historyIndex < commandHistory.value.length) {
      return commandHistory.value[historyIndex]!
    }
    return null
  }

  function clear() {
    commandHistory.value = []
  }

  return { commandHistory, appendHistory, historyBack, historyForward, clear }
})
