// File nodes represent Files in the file system
import { Node } from './node'

export class File extends Node {
  /**
   * Add a child node to this File
   */
  add(node: Node) {
    throw new Error('Cannot add children to File node')
  }
}
