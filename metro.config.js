const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
  // Make sure to use dirname
  const projectRoot = __dirname;
  const config = getDefaultConfig(projectRoot);

  const { transformer, resolver } = config;

  config.resolver.alias = {
    "@": path.resolve(projectRoot, "src"), // now @ maps to ./src
  };

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return withNativeWind(config, { input: path.resolve(projectRoot, "global.css"), inlineRem: 16 });
})();
