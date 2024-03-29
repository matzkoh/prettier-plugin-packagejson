[![npm-badge]][npm]
[![downloads-badge]][npm]
[![actions-badge]][actions]
[![renovate-badge]][renovate]
[![codecov-badge]][codecov]

[npm-badge]: https://img.shields.io/npm/v/prettier-plugin-packagejson
[npm]: https://www.npmjs.com/package/prettier-plugin-packagejson
[downloads-badge]: https://img.shields.io/npm/dw/prettier-plugin-packagejson?color=blue
[actions-badge]: https://github.com/matzkoh/prettier-plugin-packagejson/actions/workflows/release.yml/badge.svg
[actions]: https://github.com/matzkoh/prettier-plugin-packagejson/actions/workflows/release.yml
[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen
[renovate]: https://renovatebot.com/
[codecov-badge]: https://codecov.io/gh/matzkoh/prettier-plugin-packagejson/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/matzkoh/prettier-plugin-packagejson

# prettier-plugin-packagejson

A [Prettier] plugin to sort the keys of a `package.json` file using [sort-package-json].

[prettier]: https://github.com/prettier/prettier
[sort-package-json]: https://github.com/keithamus/sort-package-json

## Installation

```sh
npm i -D prettier prettier-plugin-packagejson
```

For prettier v3+ you need to configure

```js
module.exports = {
  // add this
  plugins: ['prettier-plugin-packagejson'],
}
```
