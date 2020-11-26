module.exports = {
    extends: [
        'eslint:recommended',
    ],
    rules: {
        "indent": ["error", 4],
        "no-trailing-spaces": "error"
    },
    "parserOptions": {
        "ecmaVersion": 6
    },
    "env": {
        "node": true
    }
}