const sortPackageJson = require('sort-package-json')

const { parsers } = (() => {
  try {
    return require('prettier/parser-babel')
  } catch {}
})()

const parser = parsers['json-stringify']

function testPath(path) {
  return /(^|\\|\/)package\.json$/.test(path)
}

exports.testPath = testPath

exports.parsers = {
  'json-stringify': {
    ...parser,
    preprocess(text, options) {
      if (parser.preprocess) {
        text = parser.preprocess(text, options)
      }
      const sortPackageJsonOptions =
        options.packageSortOrder.length !== 0
          ? {
              sortOrder: options.packageSortOrder,
            }
          : undefined

      return testPath(options.filepath)
        ? sortPackageJson.default(text, sortPackageJsonOptions)
        : text
    },
  },
}

exports.options = {
  packageSortOrder: {
    category: 'Global',
    type: 'string',
    array: true,
    default: [{ value: [] }],
    description: 'Custom ordering array',
  },
}
