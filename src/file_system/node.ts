// Basic node in the file system with abstract methods that need to be defined by both Directory and File nodes

export abstract class Node {
  protected _children: Array<Node> = []
  protected _parent: Node | null = null
  readonly name: string

  constructor(name: string) {
    this.name = name
  }

  // Getters and Setters
  get children() {
    return this._children
  }

  get parent(): Node | null {
    return this._parent
  }

  set parent(node: Node | null) {
    if (this.parent !== null && node !== null) {
      throw new Error('Cannot reassign parent nodes')
    }
    this._parent = node
  }

  /**
   * Convert a node to a string using it's path
   */
  toString(): string {
    if (this.parent === null) {
      return this.name
    }
    let parentPath = this.parent.toString()
    if (parentPath === '/') {
      return `${parentPath}${this.name}`
    }
    else {
      return `${parentPath}/${this.name}`
    }
  }

  /**
   * Retrieve the child of this node with the given name, if it exists.
   * This method also handles the special names of '.' and '..', returning the correct node in each case/
   */
  getChild(name: string): Node | null {
    if (name === '.') {
      return this
    }
    if (name === '..') {
      if (this._parent !== null) {
        return this._parent
      }
      // Running `cd /../` puts you in the `/` dir, so I will match that functionality here
      return this
    }

    // Not a special case, check through the children list
    let child = null
    this._children.forEach(node => {
      if (node.name === name) {
        child = node
      }
    })
    return child
  }

  // Methods handling expanding the file system
  abstract add(node: Node): void

  // Methods that handle given commands
  abstract ls(path: string): string | null
}
