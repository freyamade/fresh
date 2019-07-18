import { FileSystem as FS } from 'javascript-terminal'

// Create a FileSystem for the terminal
export const FileSystem = FS.create({
  '/': {canModify: false},
  '/freyama.de': {},
  '/freyama.de/projects': {},
  '/freyama.de/projects/crcophony': {
    content: `<p># <span class="yellow underline">crcophony</span></p>
    <p>A Terminal UI for Discord written in Crystal.</p>
    <br />
    <p><span class="green">GitHub - <a href="https://github.com/freyamade/crcophony">https://github.com/freyamade/crcophony</a></span>`
  },
})
