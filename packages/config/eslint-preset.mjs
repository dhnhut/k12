import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cdk.out/**',
      '**/.turbo/**',
      '**/*.generated.ts',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,

  {
    languageOptions: {
      parserOptions: { projectService: true },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  // Plain JS belongs to no tsconfig, so type-aware rules would crash on it.
  // It also needs Node globals declared: flat config assumes no environment,
  // and `no-undef` stays ON for .js/.mjs (typescript-eslint only switches it
  // off for .ts/.tsx/.mts/.cts).
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },

  // Must be last: turns off every stylistic rule so Prettier alone owns formatting.
  prettier,
);
