// lib
import { FileSystem as FS } from 'javascript-terminal'
// local
import { Changes } from './changes'
import { CloudCIX } from './experience/cix'
import { Honu } from './experience/honu'
import { N8N } from './experience/n8n'
import { Netsoc } from './experience/netsoc'
import { Fresh } from './projects/fresh'
import { GithubUserLanguages } from './projects/ghl'
import { SavageAIIM } from './projects/savage-ai-im'
import { SavageAim } from './projects/savage-aim'
import { LearningPlans } from './learning'

// Create a FileSystem for the terminal
export const FileSystem = FS.create({
  '/': {},
  '/tmp': {},
  '/freyama.de': {home: true},
  '/freyama.de/.changes': {content: Changes},
  '/freyama.de/learning_plans': {content: LearningPlans},
  '/freyama.de/experience': {},
  '/freyama.de/experience/1-honu.ai': {content: Honu},
  '/freyama.de/experience/2-n8n.io': {content: N8N},
  '/freyama.de/experience/3-cloudcix': {content: CloudCIX},
  '/freyama.de/experience/4-netsoc': {content: Netsoc},
  '/freyama.de/projects': {},
  '/freyama.de/projects/freyama.de': {content: Fresh},
  '/freyama.de/projects/github-user-languages': {content: GithubUserLanguages},
  '/freyama.de/projects/savage-aim': {content: SavageAim},
  '/freyama.de/projects/savage-ai-im': {content: SavageAIIM},
})
