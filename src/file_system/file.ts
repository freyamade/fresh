// File nodes represent Files in the file system
import { Fresh } from '../fresh'
import { Node } from './node'

export class File extends Node {
  /**
   * Add a child node to this File
   */
  add(node: Node) {
    throw new Error('Cannot add children to File node')
  }

  /**
   * Handle a cd command by returning false, you cannot cd into a file
   */
  cd(path: string): string | null {
    return null
  }
  // abstract ls(term: Fresh)
}
