module.exports = {
    preset: "ts-jest",
     testRegex: '(/__tests__/.*|\\.(test|spec))\\.tsx?$',
    transform: {
       
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib))"]
};