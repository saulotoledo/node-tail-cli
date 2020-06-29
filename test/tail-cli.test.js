/* eslint-env jest */
'use strict'

var tailCli = require('../lib/tail-cli')

describe('tail-cli', function () {
  global.console = {
    output: '',
    outputType: '',
    log: function (data) {
      global.console.outputType = 'log'
      global.console.output = data
    },
    warn: function (data) {
      global.console.outputType = 'warn'
      global.console.output = data
    },
    error: function (data) {
      global.console.outputType = 'error'
      global.console.output = data
    }
  }
  var mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})

  it('should require a file', function () {
    tailCli.main()

    var expectedErrorCode = 1
    expect(mockExit).toHaveBeenCalledWith(expectedErrorCode)
    expect(global.console.outputType).toBe('error')
    expect(global.console.output).toContain('Missing required argument: file')
  })
})
