// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testEnvironment: "node",
  setupFiles: ["core-js"],
  collectCoverage: true,
  displayName: {
    name: "@quarksuite/core",
    color: "cyan",
  },
  moduleNameMapper: {
    "^@api(.*)$": "<rootDir>/src/index.ts",
    "^@fn(.*)$": "<rootDir>/src/fn$1",
    "^@color(.*)$": "<rootDir>/src/color$1",
    "^@scheme(.*)$": "<rootDir>/src/scheme$1",
    "^@variant(.*)$": "<rootDir>/src/variant$1",
    "^@typography(.*)$": "<rootDir>/src/typography$1",
    "^@scale(.*)$": "<rootDir>/src/scale$1",
  },
};
