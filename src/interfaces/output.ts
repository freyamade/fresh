import type { VNode } from 'vue'

export enum OutputType {
  output,
  error,
  asIs,
  jsx,
}

export interface Output {
  type: OutputType
  content: string | VNode | null
  prompt: VNode | null
}
