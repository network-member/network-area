/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    // Strip .js extension from relative imports so ts-jest can resolve .ts files
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // Resolve baseUrl-relative imports (e.g. 'config.js' → src/config.ts)
    '^([a-zA-Z].+)\\.js$': '<rootDir>/src/$1',
  },
}

export default config
