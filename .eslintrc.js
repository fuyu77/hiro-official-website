module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'next',
    'standard',
    'standard-jsx',
    'standard-with-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'multiline-ternary': 'off',
    '@typescript-eslint/no-extra-semi': 'off'
  },
  globals: {
    React: true
  }
}
