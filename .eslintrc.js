module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['next', 'xo-space', 'xo-react'],
  overrides: [
    {
      extends: ['xo-typescript/space', 'prettier'],
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/no-unused-vars': 'error',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
