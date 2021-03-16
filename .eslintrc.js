module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended",
    "prettier/vue",
  ],
  rules: {
    "no-unused-vars": "off",
  },
};
