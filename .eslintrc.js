module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'indent': ['error', 2],
    'no-multi-spaces': ['error'],
    "sort-imports": ["error", {
      "ignoreCase": true,
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": true,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
      "allowSeparatedGroups": true
    }],
  },
};
