module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/Tests/**/*.ts?(x)', '**/?(*.)(spec|test).ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>dist/move.spec.js'],
};
