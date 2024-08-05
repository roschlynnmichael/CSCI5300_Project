module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)"
    ],
    moduleFileExtensions: ["js", "jsx"],
    testMatch: [
      "<rootDir>/src/__tests__/**/*.(test|spec).js"
    ],
  };
  