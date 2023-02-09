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
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "prefer-destructuring": "off",
    "object-shorthand": "off",
    curly: "error",
    quotes: ["error", "double"],
  },
  env: {
    jest: true,
  },
  globals: {
    Nullable: true,
  },
};
