import type { Config } from '@jest/types'

export default {
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFiles: ['./tests/helpers/defaults.ts'],
  testEnvironment: 'node',
  collectCoverage: true,
  testTimeout: 60000,
  verbose: true,
} as Config.InitialOptions
