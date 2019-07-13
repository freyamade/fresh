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
   * Handle ls calls by checking that this is the end node of the supplied path
   */
  ls(path: string): string | null {
    if (path.split('/').length !== 1) {
      return null
    }
    return this.toString()
  }
}
