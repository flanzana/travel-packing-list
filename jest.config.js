// @flow
module.exports = {
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["<rootDir>/src/**/*.test.{js, jsx}"],
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  setupFiles: ["./src/setupTests.js"],
}
