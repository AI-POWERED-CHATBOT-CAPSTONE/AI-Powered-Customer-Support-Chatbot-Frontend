import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './', // path to your Next.js app
})

const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
},
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(customJestConfig)
