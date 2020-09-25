// lib
import { FileSystem as FS } from 'javascript-terminal'
// local
import { CloudCIX } from './experience/cix'
import { Crcophony } from './projects/crcophony'
import { Drizzle } from './projects/drizzle'
import { Fresh } from './projects/fresh'
import { GithubUserLanguages } from './projects/ghl'
import { Changes } from './changes'
import { LearningPlans } from './learning'

// Create a FileSystem for the terminal
export const FileSystem = FS.create({
  '/': {},
  '/freyama.de': {home: true},
  '/freyama.de/.changes': {content: Changes},
  '/freyama.de/learning_plans': {content: LearningPlans},
  '/freyama.de/experience': {},
  '/freyama.de/experience/cloudcix': {content: CloudCIX},
  '/freyama.de/projects': {},
  '/freyama.de/projects/crcophony': {content: Crcophony},
  '/freyama.de/projects/drizzle': {content: Drizzle},
  '/freyama.de/projects/freyama.de': {content: Fresh},
  '/freyama.de/projects/github-user-languages': {content: GithubUserLanguages},
})
