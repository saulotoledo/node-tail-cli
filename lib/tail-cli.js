
'use strict'

var isBinaryFile = require('isbinaryfile').isBinaryFile
var fs = require('fs')
var Tail = require('tail').Tail
var yargs = require('yargs')

/**
 * Build options for the Tail library based on user options.
 *
 * @param {object} argv Command line arguments.
 * @returns Tail library options.
 */
function buildOptions (argv) {
  return {
    separator: new RegExp(argv.separator),
    fromBeginning: argv.fromBeginning,
    fsWatchOptions: {},
    follow: argv.follow,
    logger: console,
    useWatchFile: argv.useWatchFile,
    encoding: argv.encoding,
    flushAtEOF: argv.flushAtEOF
  }
}

/**
 * Run tail in a file.
 *
 * @param {string} filepath Path for the file to tail.
 * @param {object} options Tail library options.
 */
function tailCli (filepath, options) {
  var tail = new Tail(filepath, options)

  tail.on('line', function (data) {
    console.log(data)
  })

  tail.on('error', function (error) {
    console.log('ERROR: ', error)
  })
}

/**
 * Script entry point.
 */
function main () {
  var argv = yargs
    .option('file', {
      alias: 'f',
      demandOption: true,
      description: 'The file to tail',
      type: 'string'
    })
    .option('separator', {
      alias: 's',
      default: '[\\r]{0,1}\\n',
      description: 'The line separator token',
      type: 'string'
    })
    .option('fromBeginning', {
      alias: 'fb',
      default: false,
      description: 'Forces the tail of the file from the very beginning of it instead of from the first new line that will be appended',
      type: 'boolean'
    })
    .option('follow', {
      alias: 'fw',
      default: false,
      description: 'Simulate `tail -F` option. In the case the file is moved/renamed (or logrotated), if set tail will try to start tailing again after a 1 second delay, if it is not set it will just emit an error event',
      type: 'boolean'
    })
    .option('useWatchFile', {
      alias: 'uwf',
      default: false,
      description: 'If set to `true` it will force the use of `fs.watchFile` rather than delegating to the library the choice between `fs.watch` and `fs.watchFile`',
      type: 'boolean'
    })
    .option('encoding', {
      alias: 'e',
      default: 'utf-8',
      description: 'The encoding of the file to tail',
      type: 'string'
    })
    .option('flushAtEOF', {
      alias: 'feof',
      default: false,
      description: 'Set it if you want to force flush of content when end of file is reached. Particularly useful when there is no separator character at the end of the file',
      type: 'boolean'
    })
    .help()
    .alias('help', 'h')
    .showHelpOnFail(true)
    .version(false)
    .argv

  var filepath = argv.file
  if (filepath) {
    var data = fs.readFileSync(filepath)
    var stat = fs.lstatSync(filepath)

    isBinaryFile(data, stat.size).then((result) => {
      if (result) {
        // separator must be null if the file is binary.
        argv.separator = null
      }

      var options = buildOptions(argv)
      tailCli(filepath, options)
    })
  }
}

// allow direct execution
if (require.main === module) {
  main()
}

exports.main = main
