# Prettier plugin for package.json

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

  "plugins": ["prettier-plugin-packagejson"],
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
