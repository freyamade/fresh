import { FileSystem as FS } from 'javascript-terminal'

// Create a FileSystem for the terminal
export const FileSystem = FS.create({
  '/': {canModify: false},
  '/freyama.de': {},
  '/freyama.de/.changes': {
    content: `<p># <span class="yellow underline">Latest Changes</span></p>
      <p>## <span class="cyan underline">19.07.2019</span><p>
      <p><span class="green">-</span> Fully redeveloped the website using a different library instead of XtermJS.</p>
      <p><span class="green">-</span> XtermJS was a library meant to connect to a bash shell or something underneath, wasn't really designed for the use case.</p>
      <p><span class="green">-</span> This new library comes with some command emulation built in.</p>
      <p><span class="green">-</span> It's also made my bundle size smaller!</p>
      <p><span class="green">-</span> And the website uses normal HTML to render output and gather input, meaning it's actually usable on mobile!</p>`
  },
  '/freyama.de/projects': {},
  '/freyama.de/projects/crcophony': {
    content: `<p># <span class="yellow underline">crcophony</span></p>
    <p>A Terminal UI for Discord written in Crystal.</p>
    <br />
    <p><span class="green">GitHub - <a href="https://github.com/freyamade/crcophony">https://github.com/freyamade/crcophony</a></span>`
  },
  '/freyama.de/projects/drizzle': {
    content: `<p># <span class="yellow">drizzle</span></p>
      <p>Drizzle is a programming language of my own design, written in Crystal.</p>
      <p>It is designed as a language I would like to use myself, and it's being made primarily to help learn how languages work.</p>
      <br />
      <p><span class="green">GitHub  &nbsp;&nbsp;- <a href="https://github.com/drizzle-lang">https://github.com/drizzle-lang</a></span></p>
      <p><span class="cyan">Homepage - <a href="https://drizzle-lang.dev">https://drizzle-lang.dev</a></span></p>`,
  },
  '/freyama.de/projects/freyama.de': {
    content: `<p># <span class="yellow">freyama.de</span></p>
      <p>My personal website, written as an interactive terminal.</p>
      <br />
      <p><span class="green">GitHub - <a href="https://github.com/freyamade/fresh">https://github.com/freyamade/fresh</a></span></p>`,
  },
  '/freyama.de/projects/github-user-languages': {
    content: `<p># <span class="yellow">github-user-languages</span></p>
      <p>A browser extension for displaying pie charts of language usage on GitHub profiles.</p>
      <br />
      <p><span class="green">GitHub &nbsp;- <a href="https://github.com/freyamade/github-user-languages">https://github.com/freyamade/github-user-languages</a></span></p>
      <p><span class="cyan">Firefox - <a href="https://addons.mozilla.org/en-US/firefox/addon/github-user-languages/">https://addons.mozilla.org/en-US/firefox/addon/github-user-languages/</a></span></p>
      <p><span class="cyan">Chrome &nbsp;- <a href="https://chrome.google.com/webstore/detail/github-user-languages/kikdmnikeponomghepmfipgiijlmfhfl">https://chrome.google.com/webstore/detail/github-user-languages/kikdmnikeponomghepmfipgiijlmfhfl</a></span></p>`,
  },
})
