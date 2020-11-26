module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    rules: {
        "indent": ["error", 4],
        "no-trailing-spaces": "error"
    },
    "parserOptions": {
        "ecmaVersion": 6
    },
    "env": {
        "browser": true
    }
}