module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo|expo-modules-core|expo-router)',
  ],
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^react-native/Libraries/Animated/NativeAnimatedHelper$': '<rootDir>/jest-mocks/NativeAnimatedHelper.js',
  },
};
