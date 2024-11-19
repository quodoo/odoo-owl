module.exports = {
    "env": {
        "browser": true,
        "es2022": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@odoo/owl",
    ],
    "rules": {
        // "@odoo/owl/force-component-props-declaration": 2, // 1 for warning, 2 for error
        "semi": ["error", "always"],
        // "quotes": ["error", "double"],
        "no-unused-vars": "warn",
        // "import/no-unresolved": "off",
        // "no-console": "warn"
    }
}