// lib
import { FileSystem as FS } from 'javascript-terminal'
// local
import { Changes } from './changes'
import { Crcophony } from './crcophony'
import { Drizzle } from './drizzle'
import { Fresh } from './fresh'
import { GithubUserLanguages } from './ghl'
import { LearningPlans } from './learning'

// Create a FileSystem for the terminal
export const FileSystem = FS.create({
  '/': {canModify: false},
  '/freyama.de/.changes': {content: Changes},
  '/freyama.de/learning_plans': {content: LearningPlans},
  '/freyama.de/projects/crcophony': {content: Crcophony},
  '/freyama.de/projects/drizzle': {content: Drizzle},
  '/freyama.de/projects/freyama.de': {content: Fresh},
  '/freyama.de/projects/github-user-languages': {content: GithubUserLanguages},
})
