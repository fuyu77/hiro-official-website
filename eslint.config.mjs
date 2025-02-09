import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

export default tseslint.config(
    ...compat.config({
        extends: ['next'],
    }),
    prettier,
    {
        files: ['**/*.ts', '**/*.tsx'],
    },
    {
        files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
        extends: [tseslint.configs.disableTypeChecked],
    },
);
