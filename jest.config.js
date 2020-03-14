// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node',
  setupFiles: ['core-js'],
  collectCoverage: true,
  displayName: {
    name: '@quarksuite/core',
    color: 'cyan'
  }
};
