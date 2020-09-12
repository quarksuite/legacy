// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testEnvironment: "node",
  setupFiles: ["core-js"],
  collectCoverage: true,
  displayName: {
    name: "@quarksuite/core",
    color: "cyan"
  },
  moduleNameMapper: {
    "^@architecture(.*)$": "<rootDir>/src/architecture$1",
    "^@color(.*)$": "<rootDir>/src/color$1",
    "^@typography(.*)$": "<rootDir>/src/typography$1",
    "^@scale(.*)$": "<rootDir>/src/scale$1"
  }
};
