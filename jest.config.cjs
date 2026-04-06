module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json'],
  collectCoverageFrom: [
    'server/**/*.js',
    'src/**/*.js',
    '!server/scripts/**',
  ],
};
