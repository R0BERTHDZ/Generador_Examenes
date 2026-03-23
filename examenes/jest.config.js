const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: [],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
}

module.exports = createJestConfig(customJestConfig)
