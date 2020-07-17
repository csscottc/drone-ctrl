module.exports = {
    "env": {
        "jest": true,
        "es6": true
    },
    "extends": ["airbnb-base", "prettier"],
    "rules": {
        "quotes": ["error", "single", { "allowTemplateLiterals": true }],
        "indent": ["error", 4]
    }
};