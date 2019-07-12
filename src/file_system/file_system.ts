// Create our root node for the file system

import  { Directory } from './directory'
import { File } from './file'

export const FileSystem = new Directory('/')

// Directories
const home = new Directory('freyama.de')
const projects = new Directory('projects')
const drizzle = new Directory('drizzle')

// Files
const crcophony = new File('crcophony')
const website = new File('freyama.de')
const extension = new File('github-user-languages')

// Sort out the structure
FileSystem.add(home)
home.add(projects)
projects.add(drizzle)
projects.add(crcophony)
projects.add(website)
projects.add(extension)
