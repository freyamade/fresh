import { defineStore } from 'pinia'
import { OutputType, type Output } from '@/interfaces/output'
import { h, ref } from 'vue'

// Default initial output containing the website header, but stored here so it can be cleared
const initialInfo: Output = {
  type: OutputType.jsx,
  prompt: null,
  content: h('div', { id: 'info' }, [
    h('p', [
      h('span', { class: 'magenta', innerHTML: 'freyama.de' }),
      h('span', { innerHTML: '&nbsp;-&nbsp;' }),
      h('span', { class: 'blue', innerHTML: import.meta.env.VITE_VERSION }),
    ]),
    h('p', [
      h('span', { innerHTML: 'For a brief about-me section, run ' }),
      h('span', { class: 'yellow', innerHTML: '`whoami`' }),
      h('span', { innerHTML: '.' }),
    ]),
    h('p', [
      h('span', {
        innerHTML:
          'For an interactive terminal experience, an introduction is available by running ',
      }),
      h('span', { class: 'yellow', innerHTML: '`help`' }),
      h('span', { innerHTML: ', and all terminal commands are available by running ' }),
      h('span', { class: 'yellow', innerHTML: '`ls /bin`' }),
      h('span', { innerHTML: '.' }),
    ]),
  ]),
}

export const useOutputsStore = defineStore('outputs', () => {
  const outputs = ref<Output[]>([initialInfo])
  function writeOutput(output: Output) {
    outputs.value.push(output)
  }
  function clear() {
    outputs.value = []
  }
  return { outputs, writeOutput, clear }
})
