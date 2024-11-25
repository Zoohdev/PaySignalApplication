module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@react-navigation)/)',
    ],
  };
  