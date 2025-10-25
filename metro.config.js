const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure .jsx files are processed
config.resolver.sourceExts.push('jsx');

module.exports = config;