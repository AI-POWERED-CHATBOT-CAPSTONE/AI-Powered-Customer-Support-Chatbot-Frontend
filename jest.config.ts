import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig = {
  preset: "ts-jest",
  "verbose": true,
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Support @/ path alias
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // 👇 Add this block to support Mongoose + BSON (ESM modules)
  transformIgnorePatterns: [
    "node_modules/(?!(mongoose|mongodb|bson)/)", // allow Jest to transform ESM deps
  ],

  // 👇 ts-jest specific settings for performance & ESM handling
  globals: {
    "ts-jest": {
      isolatedModules: true,
      useESM: true,
    },
  },

  // Optional: ignore Next.js build output
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  
};


export default createJestConfig(customJestConfig);
