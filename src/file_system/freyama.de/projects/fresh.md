# fresh
- Version 2 of the Terminal that powers [my website](https://freyama.de).
- Built from the ground up using Vue3 and Pinia, with some small libraries for some helpful features;
  - [node-path](https://github.com/chaiNNer-org/node-path)
    - Polyfill for nodejs path library, used for managing file system parsing
  - [option-parser](https://github.com/tests-always-included/option-parser-js)
    - For parsing flags and arguments for commands that have flags available
  - [@highlightjs/vue-plugin](https://github.com/highlightjs/vue-plugin)
    - For syntax highlighting files using `cat` for some easier reading
- Works like a real terminal, with a custom-built file system module.
- Uses vite glob importing to read files, and commands are correctly contained within the `/bin` directory, and are loaded on demand when running the command for the first time.

## noJs
If you don't want to use javascript, you can still see the outputs of some commands at https://freyama.de/noJs.html

This output is generated at build time via running the commands and pre-rendering using [Lightpanda](https://lightpanda.io) so the information is always up to date with the full terminal experience!
