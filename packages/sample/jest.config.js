module.exports = {
    roots: ['<rootDir>packages/tests/'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            isolatedModules: true
        }
    },
    testMatch: ['**/*.test.(tsx|ts)'],
    collectCoverage: true,
    coverageReporters: ['html', 'cobertura'],
    collectCoverageFrom: [
        'packages/**',
        '!packages/tests/**',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/TestCoverage/**',
        '!**/build/**',
        '!**/public/**'
    ],
    coverageDirectory: './TestCoverage/',
    transformIgnorePatterns: [],
    moduleNameMapper: {},
    preset: 'ts-jest',
    setupFiles: ['./packages/tests/setup.tsx']
};
