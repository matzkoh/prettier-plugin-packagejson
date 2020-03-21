const { parsers } = require('prettier/parser-babel')
const sortPackageJson = require('sort-package-json')
const parser = parsers['json-stringify']

exports.parsers = {
  'json-stringify': {
    ...parser,
    preprocess(text, options) {
      if (parser.preprocess) {
        text = parser.preprocess(text, options)
      }
      if (options.filepath && /(^|\\|\/)package\.json$/.test(options.filepath)) {
        return sortPackageJson(text)
      }
      return text
    },
  },
}
