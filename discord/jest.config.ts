import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    transformIgnorePatterns: [],
    testMatch: [
        "**/__tests__/**/*.test.ts",
        "**/__tests__/**/*.spec.ts"
    ],
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest"
    },
    moduleNameMapper: {
        "^@@root/(.*)$": "<rootDir>/src/$1",
        "^@@api/(.*)$": "<rootDir>/src/api/$1",
        "^@@constants/(.*)$": "<rootDir>/src/constants/$1",
        "^@@commands/(.*)$": "<rootDir>/src/commands/$1",
        "^@@config/(.*)$": "<rootDir>/src/config/$1",
        "^@@controllers/(.*)$": "<rootDir>/src/controllers/$1",
        "^@@middleware/(.*)$": "<rootDir>/src/middleware/$1",
        "^@@resources/(.*)$": "<rootDir>/src/resources/$1",
        "^@@services/(.*)$": "<rootDir>/src/services/$1",
        "^@@types/(.*)$": "<rootDir>/src/types/$1",
        "^@@utils/(.*)$": "<rootDir>/src/utils/$1",
        // "^@@tests/support/(.*)$": "<rootDir>/src/__tests__/support/$1",
        // "^@@tests/integration/(.*)$": "<rootDir>/src/__tests__/integration/$1"
    },
    resolver: "ts-jest-resolver",
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
};

export default config;