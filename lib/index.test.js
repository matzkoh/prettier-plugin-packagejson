const { readFile } = require('fs/promises')
const { beforeAll, describe, expect, it } = require('@jest/globals')
const prettier = require('prettier')
const { parsers } = require('prettier/parser-babel')
const { testPath } = require('.')

describe('testPath()', () => {
  it.each(['package.json', 'foo/bar/package.json'])('matches: %s', path => {
    expect(testPath(path)).toBe(true)
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
  ])('not matches: %s', path => {
    expect(testPath(path)).toBe(false)
  })
})

describe('format', () => {
  let uglyJson

  beforeAll(async () => {
    uglyJson = await prettier.format(
      await readFile(require.resolve('./fixtures/ugly.json'), 'utf8'),
      {
        filepath: 'package.json',
      },
    )
  })

  it('should be correct', () =>
    expect(
      Promise.resolve(
        prettier.format(uglyJson, {
          filepath: 'package.json',
          plugins: ['./lib/index.cjs'],
        }),
      ),
    ).resolves.toMatchSnapshot())

  it('should not format if not a package.json', () =>
    expect(
      Promise.resolve(
        prettier.format(uglyJson, {
          parser: 'json-stringify',
          filepath: 'foo.json',
          plugins: ['./lib/index.cjs'],
        }),
      ),
    ).resolves.toBe(uglyJson))

  it('preprocess should be executed', async () => {
    const preprocess = jest.fn(() => '{}')
    parsers['json-stringify'].preprocess = preprocess

    await expect(
      Promise.resolve(
        prettier.format(uglyJson, {
          filepath: 'package.json',
          plugins: ['./lib/index.cjs'],
        }),
      ),
    ).resolves.toBe('{}\n')

    delete parsers['json-stringify'].preprocess
  })
})
