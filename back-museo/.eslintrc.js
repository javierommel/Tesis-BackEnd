module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: { 
    'no-console': 'off',
    'no-use-before-define': 'warn',
    'unexpected-unnamed-function':'off',
    'spaced-comment': 'warn',
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    'no-tabs': ["error", { "allowIndentationTabs": true }],
    'camelcase': 'off',
  }, 
  settings: {
    "require/resolver": {
      "node": {
        "extensions": [".js", ".jsx"]
      }
    }
  }
};
