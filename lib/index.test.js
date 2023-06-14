const { describe, expect, it } = require('@jest/globals')
const prettier = require('prettier')

const uglyJson = `{
  "license": "",
  "version":    "",
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
    "posttest": "",
    "test": "",
    "start": "",
    "pretest": "",
    "build": "",
    "postbuild": "",
    "prebuild": "",
    "lint": "",
    "dev": ""
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

describe.each([
  {
    parser: undefined,
    files: [
      { format: true, filepath: 'package.json' },
      { format: true, filepath: 'foo/bar/package.json' },
      { format: false, filepath: 'Package.json' },
      { format: false, filepath: 'package.JSON' },
      { format: false, filepath: 'package-lock.json' },
      { format: false, filepath: 'composer.json' },
      { format: false, filepath: 'package.json/composer.json' },
      { format: false, filepath: 'foo.json' },
    ],
  },
  {
    parser: 'json-stringify',
    files: [
      { format: true, filepath: 'package.json' },
      { format: true, filepath: 'foo/bar/package.json' },
      { format: false, filepath: 'Package.json' },
      { format: false, filepath: 'package.JSON' },
      { format: false, filepath: 'package-lock.json' },
      { format: false, filepath: 'composer.json' },
      { format: false, filepath: 'package.json/composer.json' },
      { format: false, filepath: 'foo.json' },
      { format: false, filepath: 'bar.js' },
      { format: false, filepath: undefined },
    ],
  },
])('parser: $parser', ({ parser, files }) => {
  it.each(files)('%s', async ({ filepath }) => {
    await expect(
      Promise.resolve(
        prettier.format(uglyJson, {
          parser,
          filepath,
          plugins: ['./lib/index.js'],
        }),
      ),
    ).resolves.toMatchSnapshot()
  })
})
