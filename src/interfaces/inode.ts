export interface INode {
  title: string
  path: string
  importPath: string
  hidden: boolean
  permissions: number
  contents: (() => Promise<string | null>) | null
  isDir: boolean
  parent: INode
  children: Record<string, INode>
}

export function isExecutable(node: INode): boolean {
  return !!(node.permissions & 0o100 || node.permissions & 0o010)
}
