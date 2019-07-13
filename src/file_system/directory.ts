// Directory nodes represent Directories in the file system
import { Fresh } from '../fresh'
import { Node } from './node'

export class Directory extends Node {
  /**
   * Add a child node to this Directory.
   */
  add(node: Node): void {
    this._children.push(node)
    // Keep the list of children nodes sorted by name
    this._children.sort()
    node.parent = this
  }
}
