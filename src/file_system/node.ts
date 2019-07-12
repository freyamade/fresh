// Basic node in the file system with abstract methods that need to be defined by both Directory and File nodes
import { Fresh } from '../fresh'

export abstract class Node {
  protected children: Array<Node> = []
  protected parent: Node | null = null
  readonly name: string

  constructor(name: string) {
    this.name = name
  }

  setParent(node: Node) {
    this.parent = node
  }

  // Methods handling expanding the file system
  abstract add(node: Node): void

  // Methods that handle given commands
  abstract cd(path: string): boolean
  // abstract ls(term: Fresh)
}
