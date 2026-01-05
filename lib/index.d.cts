import type { Plugin } from 'prettier'

declare const plugin: {
  testPath(path: string): boolean

  parsers: NonNullable<Plugin['parsers']>
  options: NonNullable<Plugin['options']>
}

export = plugin

declare module 'prettier' {
  interface Options {
    /**
     * Custom sort order for `package.json` fields.
     */
    packageSortOrder?: string[] | undefined
  }
}
