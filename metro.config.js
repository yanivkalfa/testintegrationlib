const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration for React Native
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== "svg"), // Remove SVG from assets
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"], // Add SVG as a source extension
  },
};

module.exports = mergeConfig(defaultConfig, config);
