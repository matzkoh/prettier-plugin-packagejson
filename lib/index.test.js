const { describe, it } = require('@jest/globals')
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

describe('inferred parser', () => {
  it.each(['package.json', 'foo/bar/package.json'])('should format: %s', filepath => {
    expect(
      prettier.format(uglyJson, {
        filepath,
        plugins: ['.'],
      }),
    ).toMatchSnapshot()
  })

  it.each([
    'Package.json',
    'package.JSON',
    'package-lock.json',
    'composer.json',
    'package.json/composer.json',
    'foo.json',
  ])('should not format: %s', filepath => {
    expect(
      prettier.format(uglyJson, {
        filepath,
        plugins: ['.'],
      }),
    ).toMatchSnapshot()
  })
})

describe('json-stringify parser', () => {
  it.each(['package.json', 'foo/bar/package.json'])('should format: %s', filepath => {
    expect(
      prettier.format(uglyJson, {
        filepath,
        parser: 'json-stringify',
        plugins: ['.'],
      }),
    ).toMatchSnapshot()
  })

  it.each([
    'Package.json',
    'package.JSON',
    'package-lock.json',
    'composer.json',
    'package.json/composer.json',
    'foo.json',
    'bar.js',
    undefined,
  ])('should not format: %s', filepath => {
    expect(
      prettier.format(uglyJson, {
        filepath,
        parser: 'json-stringify',
        plugins: ['.'],
      }),
    ).toMatchSnapshot()
  })
})
