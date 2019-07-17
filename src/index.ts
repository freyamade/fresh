import { Fresh } from './fresh'

const fresh = new Fresh()

// Remove the noJS warning
const noJSWarning = document.getElementById('no-js')!
noJSWarning.parentElement!.removeChild(noJSWarning)
