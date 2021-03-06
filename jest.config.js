module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/uxi-cli/jest.transform.js',
  },
  rootDir: '../../',
  testPathIgnorePatterns: ['node_modules', '__snapshots__'],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  setupFiles: [
    '<rootDir>/node_modules/uxi-cli/jest.setup.js',
  ],
  snapshotSerializers: [
    '<rootDir>/node_modules/enzyme-to-json/serializer',
  ],
};
