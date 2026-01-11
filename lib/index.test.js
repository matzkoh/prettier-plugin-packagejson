const { readFile } = require('fs/promises')
const { basename, dirname, join } = require('path')
const { before, describe, it, snapshot } = require('node:test')
const prettier = require('prettier')
const { parsers } = require('prettier/parser-babel')
const { testPath } = require('./index.cjs')

snapshot.setDefaultSnapshotSerializers([
  value => (typeof value === 'string' ? String.raw`${value}` : value),
])
snapshot.setResolveSnapshotPath(path =>
  join(dirname(path), '__snapshots__', `${basename(path)}.snap`),
)

describe('testPath()', () => {
  ;['package.json', 'foo/bar/package.json'].forEach(path => {
    it(`matches: ${path}`, t => {
      t.assert.equal(testPath(path), true)
    })
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
  ].forEach(path => {
    it(`not matches: ${path}`, t => {
      t.assert.equal(testPath(path), false)
    })
  })
})

describe('format', () => {
  let uglyJson

  before(async () => {
    uglyJson = await prettier.format(
      await readFile(require.resolve('./fixtures/ugly.json'), 'utf8'),
      {
        filepath: 'package.json',
      },
    )
  })

  it('should be correct', async t =>
    t.assert.snapshot(
      await Promise.resolve(
        prettier.format(uglyJson, {
          filepath: 'package.json',
          plugins: ['./lib/index.cjs'],
        }),
      ),
    ))

  it('should not format if not a package.json', async t =>
    t.assert.equal(
      await Promise.resolve(
        prettier.format(uglyJson, {
          parser: 'json-stringify',
          filepath: 'foo.json',
          plugins: ['./lib/index.cjs'],
        }),
      ),
      uglyJson,
    ))

  it('preprocess should be executed', async t => {
    const preprocess = t.mock.fn(() => '{}')
    parsers['json-stringify'].preprocess = preprocess

    t.assert.equal(
      await Promise.resolve(
        prettier.format(uglyJson, {
          filepath: 'package.json',
          plugins: ['./lib/index.cjs'],
        }),
      ),
      '{}\n',
    )

    delete parsers['json-stringify'].preprocess
  })

  it('should follow custom order', async t =>
    t.assert.snapshot(
      await Promise.resolve(
        prettier.format(uglyJson, {
          filepath: 'package.json',
          plugins: ['./lib/index.cjs'],
          packageSortOrder: ['version', 'name'],
        }),
      ),
    ))
})
