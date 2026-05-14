import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Setup highlighting
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import markdown from 'highlight.js/lib/languages/markdown'
import hljsVuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('md', markdown)

const app = createApp(App, {
  testInputs: [
    'clear',
    'help  # just a brief header about the website',
    '',
    'whoami  # and another about lil old me!',
    '',
    'sitemap  # for some other helpful links',
    '',
    'ls -la',
    '',
    'ls projects',
    'cat projects/fresh.md  # info about the website you are currently looking at!',
    '',
    'ls work_experience',
    'cat work_experience/01_honu.md',
    '',
    'ls /bin  # the programs on the site, all load from here!',
    'cat /bin/cat.ts  # like the code that lets you print things!',
  ],
})

app.use(createPinia())
app.use(hljsVuePlugin)

app.mount('#app')
