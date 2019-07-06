const prettier = require('prettier')

const input = `{
  "license": "",
  "version": "",
  "devDependencies": {
    "B": "*",
    "A": "*"
  },
  "description": "",
  "dependencies": {
    "B": "*",
    "A": "*"
  },
  "scripts": {
    "test": "",
    "posttest": "",
    "start": "",
    "pretest": "",
    "build": "",
    "postbuild": "",
    "prebuild": "",
    "lint": ""
  },
  "peerDependencies": {
    "B": "*",
    "A": "*"
  },
  "author": "",
  "name": "",
  "optionalDependencies": {
    "B": "*",
    "A": "*"
  },
  "keywords": [
    "C",
    "B",
    "A"
  ]
}
`

const expected = `{
  "name": "",
  "version": "",
  "description": "",
  "keywords": [
    "A",
    "B",
    "C"
  ],
  "license": "",
  "author": "",
  "scripts": {
    "build": "",
    "lint": "",
    "postbuild": "",
    "prebuild": "",
    "start": "",
    "pretest": "",
    "test": "",
    "posttest": ""
  },
  "dependencies": {
    "A": "*",
    "B": "*"
  },
  "devDependencies": {
    "A": "*",
    "B": "*"
  },
  "peerDependencies": {
    "A": "*",
    "B": "*"
  },
  "optionalDependencies": {
    "A": "*",
    "B": "*"
  }
}
`

const output = prettier.format(input, {
  filepath: 'package.json',
  plugins: ['.'],
})

console.assert(output === expected)
console.log('\033[32mpassed!\033[39m')
