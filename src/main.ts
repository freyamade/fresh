import './assets/fresh.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Screen from './App.vue'

// Setup highlighting
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import markdown from 'highlight.js/lib/languages/markdown'
import hljsVuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('md', markdown)

const app = createApp(Screen)

app.use(createPinia())
app.use(hljsVuePlugin)

app.mount('#app')
