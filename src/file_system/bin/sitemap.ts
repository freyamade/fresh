import { OutputType } from '@/interfaces/output'
import { BaseProgram } from '@/base_program'
import { useOutputsStore } from '@/stores/outputs'
import { h, type VNode } from 'vue'

interface Link {
  url: string
  description: string
  sublinks?: Link[]
}

const homeUrl = 'https://freyama.de'
const sorter = (a: Link, b: Link) => a.url.localeCompare(b.url)

const links: Link[] = [
  {
    url: 'https://freyama.de/some-slides',
    description:
      'Collection of all slides for brief tech-talks given during my time in UCC Netsoc.',
  },
  {
    url: 'https://freyama.de/a/cv.pdf',
    description:
      "My fullform CV containing this site's details in a more easily accessible fashion.",
  },
].sort(sorter)

function generateNodesForLink(
  link: Link,
  urlToStrip: string,
  isLast: boolean,
  depth: number,
): VNode[] {
  // Figure out the box drawing characters to use
  const initialCharacter = isLast ? '├' : '└'
  const finalCharacter = link.sublinks == null ? '─' : '┬'
  const sublinks = link.sublinks || []

  return [
    h('p', [
      h('span', {
        class: 'sitemap-indentation',
        'aria-hidden': 'true',
        innerHTML: '─'.repeat(depth * 2),
      }),
      h('span', {
        class: 'green',
        'aria-hidden': 'true',
        innerHTML: `${initialCharacter}─${finalCharacter}&nbsp;`,
      }),
      h('span', { class: ['cyan', 'sitemap-nest'] }, [
        h('a', { href: link.url, target: '_blank', innerHTML: link.url.replace(urlToStrip, '') }),
      ]),
      h('span', { innerHTML: '&nbsp;-&nbsp' }),
      h('span', { class: 'yellow', innerHTML: link.description }),
    ]),
    ...sublinks
      .map((sublink, index) =>
        generateNodesForLink(sublink, link.url, index + 1 < sublinks.length, depth + 1),
      )
      .flat(),
  ]
}

const tree = h('div', [
  // Top level url
  h('p', [h('span', { class: 'blue', innerHTML: homeUrl })]),
  // Each individual child within links
  ...links
    .map((parentLink, index) =>
      generateNodesForLink(parentLink, homeUrl, index + 1 < links.length, 0),
    )
    .flat(),
])

export default class Sitemap extends BaseProgram {
  name = 'sitemap'
  help = {
    summary: 'view other pages under the https://freyama.de domain',
    usage: 'sitemap',
    description: [
      'Display a directory-tree-like layout of other Github Pages sites hosted under the https://freyama.de domain.',
      'All links will be clickable, and come with a description.',
    ],
  }

  get prompt(): string | null {
    return null
  }

  async handleInput(argv: string[], isCurrent: boolean): Promise<void> {
    const { writeOutput } = useOutputsStore()
    writeOutput({
      type: OutputType.jsx,
      content: tree,
      prompt: this.prompt,
    })
  }

  keyboardInterrupt(): void {}
}
