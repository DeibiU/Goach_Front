/** @type {import('jest').Config} */
module.exports = {
  testMatch: ['**/e2e/tests/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  testTimeout: 60000,
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Goach E2E Test Report',
      outputPath: './e2e-report/index.html',
    }],
  ],
};
