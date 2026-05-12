import { createPinia } from 'pinia'
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import App from '@/App.vue'

test('renders', async () => {
  const wrapper = render(App, {
    global: {
      plugins: [createPinia()],
    },
  })
})
