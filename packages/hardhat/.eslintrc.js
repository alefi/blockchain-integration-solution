module.exports = {
  extends: ['custom'],
  ignorePatterns: ['typechain-types'],
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },
};
