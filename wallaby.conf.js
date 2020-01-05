module.exports = () => ({
  env: {
    type: "node"
  },
  files: [
  	"packages/**/src/**/*.ts"
  ],
  tests: [
  	"packages/**/__tests__/**/*.spec.ts"
  ],
  testFramework: "jest"
});
