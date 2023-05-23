const path = require('path');
const config = {
    // Entry point of your application
    entry: './src/index.js',
    // Output configuration
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
      }
      
    // Other configuration options...
  };
  module.exports = config;