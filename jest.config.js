module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  collectCoverage: true,
  coverageReporters: ["text", "html", "lcov"],
  coverageDirectory: "<rootDir>/coverage/",
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Test Report",
      },
    ],
  ],
};
