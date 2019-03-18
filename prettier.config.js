module.exports = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['.'],
  overrides: [
    {
      files: 'package.json',
      options: {
        parser: 'package-json',
      },
    },
  ],
}
