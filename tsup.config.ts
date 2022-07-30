import type { Options } from 'tsup'

export const tsup: Options = {
  entry: ['./src/index.ts'],
  dts: true,
  clean: true,
  splitting: false,
  format: ['esm', 'cjs'],
  external: [
    'vue',
    'vite',
    'magic-string',
  ],
}
