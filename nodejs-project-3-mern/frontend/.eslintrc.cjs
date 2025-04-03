module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignores: ["dist"],
  files: ["**/*.{js,jsx}"],
  extends: [],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      ecmaVersion: "latest",
      ecmaFeatures: { jsx: true },
      sourceType: "module",
    },
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
