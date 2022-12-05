module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "\\.ts?$": "ts-jest",
    "node_modules/@octocloud/types/\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!@octocloud/types.*)"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
