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

  ls(path: string): string | null {
    // If this is the end of the path, run ls on this directory, else pass it down the path
    console.log(`ls: ${this.name} - ${path}`)
    if (this.name === '/' && path[0] === '/') {
      path = path.substr(1)
    }
    let split = path.split('/')
    let child = split.shift()
    let further = split.join('/')

    // If the `child` value is empty, we've reached the end
    if (child === '') {
      return this._children.map((node) => {
        if (node instanceof Directory) {
          return `\x1b[34m${node.name}\x1b[0m/`
        }
        return node.name
      }).join('  ')
    }

    // Check the child for special paths
    if (child === '.') {
      // Call the `ls` method on the same node
      return this.ls(further)
    }
    else if (child === '..') {
      // Call the `ls` method on the parent node
      if (this.parent === null) {
        return null
      }
      return this.parent.ls(further)
    }

    // Check for the child node in this node's children
    let list = null
    this._children.forEach(childNode => {
      if (childNode.name === child) {
        list = childNode.ls(further)
      }
    })
    return list
  }
}
