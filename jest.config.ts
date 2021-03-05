import type { Config } from '@jest/types'

export default {
  coveragePathIgnorePatterns: ['/node_modules/', 'tests'],
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFiles: ['./tests/helpers/defaults.ts'],
  testEnvironment: 'node',
  collectCoverage: true,
  testTimeout: 60000,
  verbose: true,
} as Config.InitialOptions
