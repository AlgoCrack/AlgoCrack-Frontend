import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  clearMocks: true,
  coverageProvider: 'babel',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest/jest-setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec).[tj]s?(x)'],
};

export default createJestConfig(customJestConfig);
