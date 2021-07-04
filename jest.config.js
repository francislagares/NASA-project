module.exports = {
  roots: ['<rootDir>/server/src', '<rootDir>/server/test'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '(/test/.*.(test|spec)).(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(test/.*.mock).(jsx?|tsx?)$'],
  verbose: true,
  projects: ['<rootDir>'],
  coverageDirectory: '<rootDir>/coverage/',
};
