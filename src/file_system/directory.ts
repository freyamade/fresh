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
  cd(path: string): boolean {
    // Extra checking for leading / character
    if (this.name === '/' && path[0] === '/') {
      path = path.substr(1)
    }
    let split = path.split('/')
    console.log(`Directory.cd: ${path} - ${split}`)
    let child = split.shift()
    let further = split.join('/')

    // If the `further` value is empty, we've reached the end
    if (further === '') {
      return true
    }

    // Check the child for special paths
    if (child === '.') {
      // Call the `cd` method on the same node
      return this.cd(further)
    }
    else if (child === '..') {
      // Call the `cd` method on the parent node
      if (this.parent === null) {
        return false
      }
      return this.parent.cd(further)
    }

    // Check for the child node in this node's children
    let valid = false
    this.children.forEach(childNode => {
      if (childNode.name === child) {
        valid = childNode.cd(further)
      }
    })

    // If we make it here, it's an invalid request
    return valid
  }
  // abstract ls(term: Fresh)
}
