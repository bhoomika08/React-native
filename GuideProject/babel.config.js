module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@src": "./src",
          "@stylesheets": "./src/stylesheets",
          "@store": "./src/store",
          "@actions": "./src/store/actions",
          "@reducers": "./src/store/reducers"
        }
      }
    ]
  ]
};
