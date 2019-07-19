import { Fresh } from './fresh'

// Remove the noJS warning
const noJSWarning = document.getElementById('no-js')!
noJSWarning.parentElement!.removeChild(noJSWarning)

// Set the VERSION in the webpage
const VERSION = '{VERSION}'
document.getElementById('version')!.innerHTML = VERSION

// Instatiate the Terminal
const fresh = new Fresh()
