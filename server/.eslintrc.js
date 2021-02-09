module.exports = {
	globals: {
		document: true,
	},
	env: {
		es2021: true,
		node: true,
	},
	extends: 'airbnb-base',
	rules: {
		'no-tabs': 0,
		indent: [2, 'tab', { SwitchCase: 1 }],
		allowIndentationTabs: 0,
		semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
		'semi-spacing': ['error', { after: true, before: false }],
		'semi-style': ['error', 'first'],
		'no-extra-semi': 'error',
		'no-unexpected-multiline': 'error',
		'no-unreachable': 'error',
		'linebreak-style': ['off'],
		'no-console': 0,
		'no-underscore-dangle': 0,
		'implicit-arrow-linebreak': 0,
		eqeqeq: 0,
		'import/extensions': [0, 'never'],
		'import/no-extraneous-dependencies': ['off'],
		'import/prefer-default-export': ['off'],
	},
}
