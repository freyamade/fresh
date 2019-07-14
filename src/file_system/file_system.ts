// Create our root node for the file system

import  { Directory } from './directory'
import { File } from './file'

export const FileSystem = new Directory('/')

// Directories
export const Home = new Directory('freyama.de')
const projects = new Directory('projects')

// Files
const crcophony = new File(
  'crcophony',
  `# \x1b[4;33mcrcophony\x1b[0m
  \rA Terminal UI for Discord written in Crystal.

  \r\x1b[32mGitHub - \x1b[4mhttps://github.com/freyamade/crcophony\x1b[0m`,
)
const drizzle = new File(
  'drizzle',
  `# \x1b[4;33mdrizzle\x1b[0m
  \rDrizzle is a programming language of my own design, written in Crystal.
  \rIt is designed as a language I would like to use myself, and it's being made primarily to help learn how languages work.

  \r\x1b[32mGitHub   - \x1b[4mhttps://github.com/drizzle-lang\x1b[0m
  \r\x1b[36mHomepage - \x1b[4mhttps://drizzle-lang.dev\x1b[0m`,
)
const website = new File(
  'freyama.de',
  `# \x1b[4;33mfreyama.de\x1b[0m
  \rMy personal website, written as an interactive terminal.

  \r\x1b[32mGitHub - \x1b[4mhttps://github.com/freyamade/fresh\x1b[0m`,
)
const extension = new File(
  'github-user-languages',
  `# \x1b[4;33mgithub-user-languages\x1b[0m
  \rA browser extension for displaying pie charts of language usage on GitHub profiles.

  \r\x1b[32mGitHub  - \x1b[4mhttps://github.com/freyamade/github-user-languages\x1b[0m
  \r\x1b[36mFirefox - \x1b[4mhttps://addons.mozilla.org/en-US/firefox/addon/github-user-languages/\x1b[0m
  \r\x1b[36mChrome  - \x1b[4mhttps://chrome.google.com/webstore/detail/github-user-languages/kikdmnikeponomghepmfipgiijlmfhfl\x1b[0m`,
)

// Sort out the structure
FileSystem.add(Home)
Home.add(projects)
projects.add(drizzle)
projects.add(crcophony)
projects.add(website)
projects.add(extension)
