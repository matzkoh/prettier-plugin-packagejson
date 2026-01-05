import type { Plugin } from 'prettier'

declare const plugin: {
  testPath(path: string): boolean

  parsers: NonNullable<Plugin['parsers']>
  options: NonNullable<Plugin['options']>
}

export = plugin
