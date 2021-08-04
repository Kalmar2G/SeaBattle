module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 0,
    'class-methods-use-this': 0,
    'max-len': 0
  },
};