module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@src": "./src",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@sharedComponents": "./src/components/shared",
          "@constants": "./src/constants",
          "@helpers": "./src/helpers",
          "@services": "./src/services",
          "@store": "./src/store",
          "@actions": "./src/store/actions",
          "@reducers": "./src/store/reducers",
          "@stylesheets": "./src/stylesheets"
        }
      }
    ]
  ]
};
