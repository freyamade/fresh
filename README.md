# fresh
Terminal clone that powers [my website](https://freyama.de).

Built using [javascript-terminal](https://github.com/rohanchandra/javascript-terminal).

Supports a variety of basic linux commands, as well as additional package installation.

Has a fully functional emulated file system.

## Supported Linux Commands
- `cat`
- `cd`
- `clear`
- `history`
- `ls`
- `printenv`
- `pwd`
- `whoami`

## Extra Commands
- `?` - Prints out a summary of the command list for the website.
- `help` - Get help about the website in general, or a specific command.
- `pkg`- List and install extra packages.

## Goals and TODOS
- Eventually add a basic `drizzle` interpreter written in WASM, once `drizzle` gets to that point.
- `*` expansion for paths (unsure as to how I'll do this as this is a library issue)
- (Maybe) make a `/bin` folder where commands will go when installed, just for flavour.
