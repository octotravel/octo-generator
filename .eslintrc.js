module.exports = {
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"],
      },
    },
  },
  plugins: ["@typescript-eslint", "unused-imports"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "airbnb", "prettier"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "warn",
    "new-cap": "error",
    "unused-imports/no-unused-imports": "error",
    curly: "error",
    "class-methods-use-this": "off",
    "import/extensions": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "prefer-destructuring": "off",
  },
  env: {
    jest: true,
  },
  globals: {
    Nullable: true,
  },
};
