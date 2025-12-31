import lovePreset from 'eslint-config-love'
import prettier from 'eslint-plugin-prettier/recommended'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig(
  lovePreset,
  prettier,
  {
    files: ['**/*.{js,mjs,cjs}', '**/*.{ts,tsx,mts,cts}'],
  },
  { ignores: ['eslint.config.mjs'] },
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/prefer-destructuring': 'off', // false positives, less readable sometimes
      '@typescript-eslint/no-magic-numbers': 'off', // too many false positives
      '@typescript-eslint/init-declarations': 'off', // too many false positives
      '@typescript-eslint/no-empty-function': 'off', // useless,
      '@typescript-eslint/no-unsafe-type-assertion': 'off', // doesn't allow type assertions where they are necessary
      '@typescript-eslint/class-methods-use-this': 'off', // useless,
      '@typescript-eslint/no-deprecated': 'off', // false positives, example: chrome namespace
      'promise/avoid-new': 'off', // tooooo opinionated from eslint-config-love
      'no-param-reassign': { props: true, ignorePropertyModificationsFor: ['req'] },
      'no-console': 'off',
    },
  },
)
