// When the current program handles a keypress event, they can edit the currentInput or suggest something
export interface HandledKeypressEvent {
  input?: string
  suggestions?: string[]
}
