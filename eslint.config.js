import js from "@eslint/js";
import node from "eslint-plugin-n";
import imprt from "eslint-plugin-import";
import unicorn from "eslint-plugin-unicorn";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import prettier from "eslint-plugin-prettier/recommended";

export default [
  js.configs.recommended,
  node.configs["flat/recommended-script"],
  comments.recommended,
  unicorn.configs.recommended,
  imprt.flatConfigs.recommended,
  prettier,
  {
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    rules: {
      "unicorn/no-null": 0,
      "unicorn/import-style": 0,
      "@eslint-community/eslint-comments/no-unused-disable": "error",
    },
  },
  {
    ignores: ["coverage/", "node_modules/", "dist/"],
  },
];
