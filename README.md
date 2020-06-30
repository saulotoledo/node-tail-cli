# tail-cli

Command line interface for tailing a file in Node.js. It is built on top of [Tail](https://github.com/lucagrulla/node-tail).

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/saulotoledo/node-tail-cli/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/tail-cli.svg?style=plastic)](https://www.npmjs.com/package/tail-cli)
![npm](https://img.shields.io/npm/dm/tail-cli.svg)

## Installation

```bash
$ npm install tail-cli --save-dev
# or
$ yarn add tail-cli --dev
```

It requires `Node@>=6`.

## Usage

This package provides the `tail-cli` command.

**Options:**
```bash
--file, -f             The file to tail               [string] [required]
--separator, -s        The line separator token
                                        [string] [default: "[\r]{0,1}\n"]
--fromBeginning, --fb  Forces the tail of the file from the very
                       beginning of it instead of from the first new line
                       that will be appended   [boolean] [default: false]
--follow, --fw         Simulate `tail -F` option. In the case the file is
                       moved/renamed (or logrotated), if set tail will
                       try to start tailing again after a 1 second delay,
                       if it is not set it will just emit an error event
                                               [boolean] [default: false]
--encoding, -e         The encoding of the file to tail
                                              [string] [default: "utf-8"]
--flushAtEOF, --feof   Set it if you want to force flush of content when
                       end of file is reached. Particularly useful when
                       there is no separator character at the end of the
                       file                    [boolean] [default: false]
--help, -h             Show help                                [boolean]
```

**npm-script example:**

```json
{
  "scripts": {
    "tail-error-log": "tail-cli -f logs/error.log"
  }
}
```

## License

MIT. Please see [LICENSE](https://github.com/saulotoledo/node-tail-cli/blob/master/LICENSE) file for more details.
