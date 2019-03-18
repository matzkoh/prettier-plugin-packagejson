const prettier = require('prettier')
const { concat, hardline, indent, join } = prettier.doc.builders

const primary = ['name', 'description', 'version', 'author', 'license']
const objects = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
const arrays = ['keywords']

function sortProperties(ast, isRoot) {
  const props = {}
  ast.properties.forEach(p => {
    props[p.key.value] = p
  })

  const keys = Object.keys(props).sort()
  const sortedKeys = isRoot
    ? [...primary.filter(k => keys.includes(k)), ...keys.filter(k => !primary.includes(k))]
    : keys

  ast.properties = sortedKeys.map(k => props[k])

  objects
    .map(k => props[k])
    .filter(Boolean)
    .forEach(p => sortProperties(p.value))

  arrays
    .map(k => props[k])
    .filter(Boolean)
    .forEach(p => sortElements(p.value))
}

function sortElements(ast) {
  ast.elements.sort((a, b) => (a.value < b.value ? -1 : b.value < a.value))
}

exports.preprocess = ast => {
  sortProperties(ast, true)

  return {
    type: 'JsonRoot',
    ast,
  }
}

exports.print = (path, options, print) => {
  const node = path.getValue()

  switch (node.type) {
    case 'JsonRoot':
      return concat([path.call(print, 'ast'), hardline])

    case 'ObjectProperty':
      return concat([path.call(print, 'key'), ': ', path.call(print, 'value')])

    case 'ObjectExpression':
      return node.properties.length === 0
        ? '{}'
        : concat([
            '{',
            indent(concat([hardline, join(concat([',', hardline]), path.map(print, 'properties'))])),
            hardline,
            '}',
          ])

    case 'ArrayExpression':
      return node.elements.length === 0
        ? '[]'
        : concat([
            '[',
            indent(concat([hardline, join(concat([',', hardline]), path.map(print, 'elements'))])),
            hardline,
            ']',
          ])

    case 'UnaryExpression':
      return concat([node.operator === '+' ? '' : node.operator, path.call(print, 'argument')])

    case 'NullLiteral':
    case 'BooleanLiteral':
    case 'StringLiteral':
    case 'NumericLiteral':
      return JSON.stringify(node.value)

    case 'Identifier':
      return JSON.stringify(node.name)

    default:
      throw new Error('unknown type: ' + JSON.stringify(node.type))
  }
}
