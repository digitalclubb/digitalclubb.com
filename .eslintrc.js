module.exports = {
	root: true,
	rules: {
		'no-cond-assign': 0,
		'no-unused-vars': 2,
		'object-shorthand': [2, 'always'],
		'no-const-assign': 2,
		'no-class-assign': 2,
		'no-this-before-super': 2,
		'no-var': 2,
		'no-unreachable': 2,
		'valid-typeof': 2,
		'one-var': [2, 'never'],
		'prefer-arrow-callback': 2,
		'prefer-const': [2, { destructuring: 'all' }],
		'no-inner-declarations': 0,
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
	},
	env: {
		es6: true,
		browser: true
    },
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'svelte3'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
	],
    overrides: [
        {
            "files": ["**/*.svelte"],
            "processor": "svelte3/svelte3"
        }
    ],
	parserOptions: {
		ecmaVersion: 9,
		sourceType: 'module',
	},
};
