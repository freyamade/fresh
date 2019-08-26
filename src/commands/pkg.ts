// The `pkg` function.
// Managed extra packages developed for the system.

import { EmulatorState, OutputFactory } from 'javascript-terminal'
import PKGList from '../pkg/pkg.json'
import { VERSION } from '../version'

// Define necessary constants
const summary: string = 'Manages extra packages, allows for listing and installation of extra features.'

const help: string = `<p class="green">pkg - ${summary}</p>
<br />
<p>Usage:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="yellow">pkg [package_name]</span></p>
<br />
<p>If <span class="yellow">package_name</span> is omitted, the command will list packages.</p>
<p>If <span class="yellow">package_name</span> is given, it will be used to search the list of packages.</p>
<p>If the search finds more than one package, the filtered list will be returned.</p>
<p>If the search matches the name of a package, it will be installed.</p>`

const optDef = {}

// Define the function
function execute(state: EmulatorState, args: string[]): any {
  // Generate a table of the available packages, filtered by a supplied string from the User
  if (args.length >= 2) {
    return {
      output: OutputFactory.makeErrorOutput({
        source: 'pkg',
        type: `Too many arguments (${args.length}). Expected 0 or 1.`,
      }),
    }
  }

  const messageBody: string[] = []
  let packages = Object.keys(PKGList)

  // Filter by a passed arg, if any
  let filter: string = ''
  if (args.length === 1) {
    filter = args[0]
    packages = packages.filter(pkgName => { return pkgName.indexOf(filter) !== -1 })
  }

  if (packages.length === 0) {
     return {
      output: OutputFactory.makeErrorOutput({
        source: 'pkg',
        type: `No packages found that match the given filter.`,
      }),
    }
  }

  // Print out the table
  for (let index = 0; index < packages.length; index++) {
    const pkgName = packages[index]
    const pkgDetails = PKGList[pkgName]

    // Check if the package name matches the arg, if so install.
    if (pkgName === filter) {
      if (pkgDetails.installed) {
        return {
          output: OutputFactory.makeErrorOutput({
            source: 'pkg',
            type: `Package "${pkgName}" is already installed.`,
          }),
        }
      }
      pkgDetails.installed = true
      return install(pkgName)
    }

    if (pkgDetails.installed) {
      messageBody.push(`<tr><td>${pkgName}</td><td>${pkgDetails.summary} (installed)</td></tr>`)
    }
    else {
      messageBody.push(`<tr><td>${pkgName}</td><td>${pkgDetails.summary}</td></tr>`)
    }
  }
  const output = `<table class="summary-table">
    <tr><th colspan="2">package repo contents;</th></tr>
    ${messageBody.sort().join('')}
  </table>`
  return { output: OutputFactory.makeTextOutput(output) }
}

function install(pkgName: string): any {
  const tag = document.createElement('script')
  tag.setAttribute('src', `/static/js/pkg/${pkgName}.js?v=${VERSION}`)
  document.body.appendChild(tag)

  // Give a message stating the installation was successful
  return {
    output: OutputFactory.makeTextOutput(
      `Installed package <span class="yellow">"${pkgName}"</span>. ` +
      `Run <span class="yellow">"?"</span> to see the added commands.`
    )
  }
}

// Export the function definition.
export const PKG = {
  'function': execute,
  optDef: optDef,
  help: help,
  summary: summary,
}
