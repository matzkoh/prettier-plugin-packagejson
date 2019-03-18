const prettier = require('prettier')

const code = `{
  "license": "",
  "author": "",
  "version": "",
  "description": "",
  "name": "",
  "keywords": [
    "C",
    "B",
    "A",
  ],
  "dependencies": {
    "B": "*",
    "A": "*"
  },
  "devDependencies": {
    "B": "*",
    "A": "*"
  },
  "optionalDependencies": {
    "B": "*",
    "A": "*"
  },
  "peerDependencies": {
    "B": "*",
    "A": "*"
  }
}
`

const expected = `{
  "name": "",
  "description": "",
  "version": "",
  "author": "",
  "license": "",
  "dependencies": {
    "A": "*",
    "B": "*"
  },
  "devDependencies": {
    "A": "*",
    "B": "*"
  },
  "keywords": [
    "A",
    "B",
    "C"
  ],
  "optionalDependencies": {
    "A": "*",
    "B": "*"
  },
  "peerDependencies": {
    "A": "*",
    "B": "*"
  }
}
`

const formatted = prettier.format(code, {
  parser: 'package-json',
  plugins: ['.'],
})

console.assert(formatted === expected)
console.log('\033[32mpassed!\033[39m')
