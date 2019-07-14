// File nodes represent Files in the file system
import { Node } from './node'

export class File extends Node {
  // Keep a small string of contents
  readonly contents: string

  // Override the constructor
  constructor(name: string, contents: string) {
    super(name)
    this.contents = contents
  }
  /**
   * Add a child node to this File
   */
  add(node: Node) {
    throw new Error('Cannot add children to File node')
  }
}
