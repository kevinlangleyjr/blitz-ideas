module.exports = {
  env: {
    es2020: true,
  },
  extends: ["blitz", "plugin:jsx-a11y/recommended"],
  plugins: ["jsx-a11y"],
  rules: {
    curly: "error",
    semi: [2, "always"],
    quotes: [2, "single", "avoid-escape"],
    "react/jsx-curly-spacing": [2, { when: "always", children: true }],
    "space-before-blocks": ["error", "always"],
    "space-in-parens": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "always"],
    "import/no-anonymous-default-export": "error",
    "import/no-webpack-loader-syntax": "off",
    "react/react-in-jsx-scope": "off", // React is always in scope with Blitz
    "jsx-a11y/anchor-is-valid": "off", //Doesn't play well with Blitz/Next <Link> usage
    "space-unary-ops": [
      2,
      {
        words: true,
        nonwords: false,
        overrides: {
          new: true,
          "++": false,
          "!": true,
          "!!": true,
        },
      },
    ],
  },
}
