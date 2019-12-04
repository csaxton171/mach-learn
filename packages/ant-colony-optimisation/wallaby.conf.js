module.exports = wallaby => {
  return {
    env: {
      type: "node"
    },
    files: ["src/**/*.ts"],
    tests: ["__tests__/**/*.spec.ts"],
    testFramework: "jest"
  };
};
