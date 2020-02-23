module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        "(.*)\\.js": "$1"
    },
    roots: [
        "<rootDir>/src",
        "<rootDir>/__tests__",
        "<rootDir>/dist"
    ],
};
