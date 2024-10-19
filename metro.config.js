const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
//const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

//module.exports = wrapWithReanimatedMetroConfig(config);
module.exports = mergeConfig(getDefaultConfig(__dirname), config);