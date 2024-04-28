module.exports = {
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    testEnvironment: 'jest-environment-jsdom',
  };