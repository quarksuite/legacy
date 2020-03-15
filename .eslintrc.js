module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier',
    'plugin:prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports,
    project: './tsconfig.json'
  }
};
