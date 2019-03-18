const { parsers } = require('prettier/parser-babylon')
const parser = parsers['json-stringify']
const printer = require('./printer')

exports.parsers = {
  'package-json': {
    ...parser,
    astFormat: 'package-json',
  },
}

exports.printers = {
  'package-json': {
    ...printer,
  },
}
