module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  parserOptions: {
    project: __dirname + '/tsconfig.json',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-boolean-value': ['warn', 'never'],
    'react/no-direct-mutation-state': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-this-in-sfc': 'error',
    'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],
    'react/self-closing-comp': 'warn',
    'react/void-dom-elements-no-children': 'error',
    'react/prop-types': 'off',

    '@typescript-eslint/indent': 'off',
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: 'props',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },
  root: true,
};
