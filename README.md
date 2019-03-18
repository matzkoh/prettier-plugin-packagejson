# Prettier plugin for package.json

[![CircleCI](https://circleci.com/gh/matzkoh/prettier-plugin-packagejson.svg?style=shield)](https://circleci.com/gh/matzkoh/prettier-plugin-packagejson)
[![Renovate](https://badges.renovateapi.com/github/matzkoh/prettier-plugin-packagejson)](https://renovatebot.com/)

## Installation

```bash
$ npm i -D prettier prettier-plugin-packagejson
```

`overrides` is required because native json parser takes precedence over this plugin.

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",

  "overrides": [
    {
      "files": "package.json",
      "options": {
        "parser": "package-json"
      }
    }
  ]
}
```

## Rules

- Primary (ordered to top)
  1. name
  2. description
  3. version
  4. author
  5. license
- Others
  - Sorted alphabetically
- Sort children
  - dependencies
  - devDependencies
  - peerDependencies
  - optionalDependencies
  - keywords

ToDo: Add more tweaks
