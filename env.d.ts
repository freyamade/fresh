/// <reference types="vite/client" />
declare module 'option-parser' {
  class OptionParameter {
    value(): string | numer | null
  }
  class OptionParser {
    parse(argv: string[]): string[]
    programName(name: string): void
    addOption(flag: string, longFlag: string | null, helpText: string, internalName: string)
    [name: string]: OptionParameter
  }
  export = OptionParser
}

declare module '@chainner/node-path/posix' {
  export function normalize(path: string): string
  export function join(path1: string, path2: string): string
  export function isAbsolute(path: string): boolean
}
