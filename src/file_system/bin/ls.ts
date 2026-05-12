import OptionParser from 'option-parser'
import { OutputType } from '@/interfaces/output'
import { BaseProgram } from '@/base_program'
import { useOutputsStore } from '@/stores/outputs'
import useFileSystem from '@/plugins/file_system'
import { isExecutable, type INode } from '@/interfaces/inode'
import { FreshError } from '@/errors'
import { h } from 'vue'

export default class LS extends BaseProgram {
  name = 'ls'
  help = {
    summary: 'list directory contents',
    usage: 'ls [OPTION]... [FILE]...',
    description: ['List information about the FILEs (the current directory by default).'],
  }
  options = [
    {
      flag: 'a',
      longFlag: 'all',
      helpText: 'do not ignore entries starting with .',
      internalName: 'all',
    },
    {
      flag: 'A',
      longFlag: 'almost-all',
      helpText: 'do not list implied . and ..',
      internalName: 'almostAll',
    },
    { flag: 'l', longFlag: null, helpText: 'use a long listing format', internalName: 'long' },
  ]

  get prompt(): string | null {
    return null
  }

  private generatePermissionsString(permissions: number, isDir: boolean): string {
    return [
      isDir ? 'd' : '-',
      permissions & 0o400 ? 'r' : '-',
      permissions & 0o200 ? 'w' : '-',
      permissions & 0o100 ? 'x' : '-',
      permissions & 0o040 ? 'r' : '-',
      permissions & 0o020 ? 'w' : '-',
      permissions & 0o010 ? 'x' : '-',
      permissions & 0o004 ? 'r' : '-',
      permissions & 0o002 ? 'w' : '-',
      permissions & 0o001 ? 'x' : '-',
    ].join('')
  }

  private listDirectory(dir: INode, parser: OptionParser): void {
    const { writeOutput } = useOutputsStore()
    let children: INode[]
    const almostAll = !!parser.almostAll?.value()
    const showAll = !!parser.all?.value() || almostAll
    const longFormat = !!parser.long?.value()

    if (!almostAll) {
      // If we don't explicitly remove the . and .. then we need to create fake nodes for them
      const currentNode: INode = {
        title: '.',
        path: dir.path,
        importPath: dir.importPath,
        hidden: true,
        permissions: dir.permissions,
        contents: null,
        isDir: true,
        parent: dir.parent,
        children: dir.children,
      }
      const parentNode: INode = {
        title: '..',
        path: dir.parent.path,
        importPath: dir.parent.importPath,
        hidden: true,
        permissions: dir.parent.permissions,
        contents: null,
        isDir: true,
        parent: dir.parent.parent,
        children: dir.parent.children,
      }
      children = [currentNode, parentNode, ...Object.values(dir.children)]
    } else {
      children = Object.values(dir.children)
    }

    children.sort((a, b) => a.title.localeCompare(b.title))
    const nodes = []
    for (const childNode of children) {
      if (childNode.hidden && !showAll) continue

      // Determine colour and name based on directory, executable or regular file
      let textClass = 'white'
      let text = childNode.title
      if (childNode.isDir) {
        textClass = 'blue'
        text += '/'
      } else if (isExecutable(childNode)) {
        textClass = 'cyan'
        text += '*'
      }

      // Determine output node style
      if (longFormat) {
        nodes.push(
          h('div', { class: 'long' }, [
            h('span', {
              innerHTML: this.generatePermissionsString(childNode.permissions, childNode.isDir),
            }),
            h('span', { innerHTML: 'freya' }),
            h('span', { innerHTML: 'freya' }),
            h('span', {
              class: textClass,
              innerHTML: text,
            }),
          ]),
        )
      } else {
        nodes.push(
          h('div', {
            class: textClass,
            innerHTML: text,
          }),
        )
      }
    }
    const rootNode = h('div', { class: ['ls'] }, nodes)
    writeOutput({
      type: OutputType.jsx,
      content: rootNode,
      prompt: this.prompt,
    })
  }

  async handleInput(argv: string[], isCurrent: boolean): Promise<void> {
    const { writeOutput } = useOutputsStore()
    const fileSystem = useFileSystem()
    const parser = this.parser
    argv = parser.parse(argv) // returns the strings not contained in options

    // List cwd if no args, paths if args (if multiple, print the dir name before each attempt)
    if (argv.length === 1) {
      // List the children of the current working directory
      this.listDirectory(fileSystem.CWD, parser)
    } else {
      // Iterate through each item past the program name and list their contents, topped with a dir name if needed
      for await (const dirName of argv.slice(1)) {
        // TODO - try and open the file once we have a working filesystem
        try {
          const node = await fileSystem.getNode(dirName)
          if (node == null)
            throw new FreshError(`cannot access "${dirName}": no such file or directory`)

          // Node exists, if file we can just print its name
          if (!node.isDir) {
            // Print the name of the file
            writeOutput({
              type: OutputType.output,
              content: dirName,
              prompt: this.prompt,
            })
          } else {
            if (argv.length > 2) {
              // Print the name of the file
              writeOutput({
                type: OutputType.output,
                content: `${dirName}:`,
                prompt: this.prompt,
              })
            }
            this.listDirectory(node, parser)
            if (argv.length > 2) {
              // Print a new line between the directories
              writeOutput({
                type: OutputType.output,
                content: null,
                prompt: this.prompt,
              })
            }
          }
        } catch (e) {
          if (e instanceof FreshError) {
            writeOutput({
              type: OutputType.error,
              content: `ls: ${e.message}`,
              prompt: this.prompt,
            })
          } else {
            throw e
          }
        }
      }
    }
  }

  keyboardInterrupt(): void {}
}
