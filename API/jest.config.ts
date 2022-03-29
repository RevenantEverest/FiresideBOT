import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**.**.*.test.ts"],
  verbose: true,
  automock: true,
  forceExit: true
};

export default config;