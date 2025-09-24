const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
	'@': __dirname, // maps @ to project root
};

module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 });
