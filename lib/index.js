const { parsers } = require('prettier/parser-babylon')
const sortPackageJson = require('sort-package-json')
const parser = parsers['json-stringify']

exports.parsers = {
  'json-stringify': {
    ...parser,
    preprocess(text, options) {
      if (parser.preprocess) {
        text = parser.preprocess(text, options)
      }
      return sortPackageJson(text)
    },
  },
}
