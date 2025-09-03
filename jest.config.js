/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    collectCoverageFrom: ['src/**/*.js', '!**/generated/**'],
    watchPathIgnorePatterns: [
        '<rootDir>/postgres-data/',
        '<rootDir>/node_modules/',
        '<rootDir>/coverage/',
    ],
    globalSetup: '<rootDir>/jest.global-setup.js',
    setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.js'],
    noStackTrace: true,
    transform: {}, // ESM puro, sem Babel
}

export default config
