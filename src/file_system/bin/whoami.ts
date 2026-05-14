import { OutputType } from '@/interfaces/output'
import { BaseProgram } from '@/base_program'
import { useOutputsStore } from '@/stores/outputs'
import { h } from 'vue'

const tree = h('div', [
  // Top level url
  h('p', [h('span', { class: 'magenta', innerHTML: 'freya madeline broderick' })]),
  h('br'),
  h('p', {
    class: 'blue',
    innerHTML: 'full stack developer, platform / devops engineer, problem solver, puzzle lover.',
  }),
  h('p', {
    class: 'green',
    innerHTML: 'fluent in python & typescript. comfortable with go, ruby, rust.',
  }),
  h('p', {
    class: 'yellow',
    innerHTML:
      'love terraform, django, vuejs. experienced builder of rest monoliths and microservices, both on gcp and bare metal.',
  }),
  h('br'),
  h('p', { class: 'magenta' }, [
    h('span', { innerHTML: 'for more in-depth information, i have also ' }),
    h('a', { href: 'https://freyama.de/a/cv.pdf', target: '_blank', innerHTML: 'ma.de/a/cv' }),
  ]),
])

export default class WhoAmI extends BaseProgram {
  name = 'whoami'
  help = {
    summary: 'brief introduction from the girl behind the website',
    usage: 'whoami',
    description: [
      'See a brief overview of personal information as you might expect from a personal website such as this.',
    ],
  }

  get prompt(): null {
    return null
  }

  async executeCommand(argv: string[], isCurrent: boolean): Promise<void> {
    const { writeOutput } = useOutputsStore()
    writeOutput({
      type: OutputType.jsx,
      content: tree,
      prompt: this.prompt,
    })
  }

  keyboardInterrupt(): void {}
}
