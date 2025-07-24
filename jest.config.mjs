/** @type {import('jest').Config} */
const config = {
    // collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    collectCoverageFrom: ['src/**/*.js', '!**/generated/**'],
    watchPathIgnorePatterns: ['<rootDir>/postgres-data/'],
    globalSetup: '<rootDir>/jest.global-setup.mjs',
    setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.js'],
}

export default config
