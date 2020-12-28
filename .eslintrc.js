module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react"],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"no-console": "off",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"react/display-name": "off",
	},
	globals: { wp: "readonly" },
	ignorePatterns: [".eslintrc.js", "webpack.config.js", "gulpfile.js"],
};
