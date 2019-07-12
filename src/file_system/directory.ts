// Directory nodes represent Directories in the file system
import { Fresh } from '../fresh'
import { Node } from './node'

export class Directory extends Node {
  /**
   * Add a child node to this Directory.
   */
  add(node: Node): void {
    this.children.push(node)
    node.setParent(this)
  }

  /**
   * Handle the cd command by recursively traversing the `path` parameter and ensuring that the path is valid.
   * Return a flag stating whether or not the cd requst is valid.
   */
  cd(path: string): Node | null {
    // Extra checking for leading / character, only for root node
    if (this.name === '/' && path[0] === '/') {
      path = path.substr(1)
    }
    let split = path.split('/')
    let child = split.shift()
    let further = split.join('/')

    // If the `child` value is empty, we've reached the end
    if (child === '') {
      return this
    }

    // Check the child for special paths
    if (child === '.') {
      // Call the `cd` method on the same node
      return this.cd(further)
    }
    else if (child === '..') {
      // Call the `cd` method on the parent node
      if (this.parent === null) {
        return null
      }
      return this.parent.cd(further)
    }

    // Check for the child node in this node's children
    let change = null
    this.children.forEach(childNode => {
      if (childNode.name === child) {
        change = childNode.cd(further)
      }
    })

    // If we make it here, it's an invalid request
    return change
  }
  // abstract ls(term: Fresh)
}
