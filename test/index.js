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
    "C",
    "B",
    "A"
  ],
  "license": "",
  "author": "",
  "scripts": {
    "prebuild": "",
    "build": "",
    "postbuild": "",
    "lint": "",
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

;['package.json', 'foo/bar/package.json'].forEach(filepath => {
  const output = prettier.format(input, {
    filepath,
    plugins: ['.'],
  })
  console.log('Testing', filepath)
  console.assert(output === expected, 'Output does not match expected output')
  if (output !== expected) {
    process.exitCode = 1
  }
  console.log()
})
;[
  'Package.json',
  'package.JSON',
  'package-lock.json',
  'composer.json',
  'package.json/composer.json',
  'foo.json',
  'bar.js',
  undefined,
].forEach(filepath => {
  const output = prettier.format(input, {
    filepath,
    parser: 'json-stringify',
    plugins: ['.'],
  })
  console.log('Testing', filepath)
  console.assert(output === input, 'Output does not match input')
  if (output !== input) {
    process.exitCode = 1
  }
  console.log()
})

if (process.exitCode) {
  console.log('\033[31mFailed!\033[39m')
} else {
  console.log('\033[32mpassed!\033[39m')
}
