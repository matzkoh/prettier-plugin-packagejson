const requireSafe = require('./require')
const sortPackageJson = require('./sort-package-json')

const { parsers } =
  requireSafe('prettier/parser-babel') ||
  // istanbul ignore next
  requireSafe('prettier/parser-babylon')

const parser = parsers['json-stringify']

function testPath(path) {
  return /(^|\\|\/)package\.json$/.test(path)
}

exports.testPath = testPath

/** @type {import('prettier').Plugin['parsers']} */
exports.parsers = {
  'json-stringify': {
    ...parser,
    preprocess(text, options) {
      if (parser.preprocess) {
        text = parser.preprocess(text, options)
      }

      return testPath(options.filepath) ? sortPackageJson.default(text) : text
    },
  },
}
