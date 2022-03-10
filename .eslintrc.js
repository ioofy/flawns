module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "google", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    "require-jsdoc": 0,
    "new-cap": 0,
    // disabled react props-type
    "react/prop-types": "off",
    // disabled any valid js-doc comments
    "valid-jsdoc": 0,
    // activated hooks dependencies warn for better development
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
  },
  settings: {
    react: {
      version: "latest",
    },
  },
};
