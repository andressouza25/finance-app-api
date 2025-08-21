// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'

export default [
    {
        ignores: ['src/generated/**'], // ignora esta pasta
    },
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.jest,
                ...globals.node,
            },
        },
        rules: {
            // adicione suas regras personalizadas aqui
        },
    },
]
