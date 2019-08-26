import { Fresh } from './fresh'
import { VERSION } from './version'

// Remove the noJS warning
const noJSWarning = document.getElementById('no-js')!
noJSWarning.parentElement!.removeChild(noJSWarning)

// Set the VERSION in the webpage
document.getElementById('version')!.innerHTML = VERSION

// Instatiate the Terminal
const fresh = new Fresh()
