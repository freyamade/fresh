import { createPinia } from 'pinia'
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import App from '@/App.vue'

test('renders', async () => {
  // Styles are scoped to a div#app so we should make one
  const div = document.createElement('div')
  div.setAttribute('id', 'app')
  const wrapper = render(App, {
    global: {
      plugins: [createPinia()],
    },
    props: {
      testInputs: ['ls -la'],
    },
    container: document.body.appendChild(div),
  })
})
