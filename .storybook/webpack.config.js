const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /.*\.(ts|tsx|js|jsx)$/,
    loader: require.resolve("babel-loader")
  });

  defaultConfig.resolve.extensions.push(".ts", ".tsx");

  return defaultConfig;
};
