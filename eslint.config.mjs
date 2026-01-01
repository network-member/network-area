import lovePreset from 'eslint-config-love';
import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig(
  lovePreset,
  prettier,
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
  },
  { ignores: ['**/*.config.mjs'] },
  {
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/prefer-destructuring': 'off', // false positives, less readable sometimes
      '@typescript-eslint/no-magic-numbers': 'off', // too many false positives
      '@typescript-eslint/init-declarations': 'off', // too many false positives
      '@typescript-eslint/no-empty-function': 'off', // useless,
      '@typescript-eslint/no-unsafe-type-assertion': 'off', // doesn't allow type assertions where they are necessary
      '@typescript-eslint/class-methods-use-this': 'off', // useless,
      '@typescript-eslint/no-deprecated': 'off', // false positives, example: chrome namespace
      'promise/avoid-new': 'off', // tooooo opinionated from eslint-config-love
      'no-console': 'off',
    },
  },
  {
    files: ['api/**/*.{js,mjs,ts,tsx}'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['req'],
        },
      ],
    },
  },
  {
    files: ['ui/**/*.{js,mjs,ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-alert': 'off',
    },
  }
);
