module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  env: {
    node: true
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "semi": 2,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 1,

  }
}
