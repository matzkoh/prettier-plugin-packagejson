/** @type {import('prettier').Options} */
module.exports = {
  arrowParens: 'avoid',
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['./lib/index.cjs'],
}
