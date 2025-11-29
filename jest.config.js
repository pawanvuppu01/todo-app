module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo-modules-core|expo-router)',
  ],
  setupFiles: ['./jest.setup.js'],
};
