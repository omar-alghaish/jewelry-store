module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.wasm$/,
            type: 'javascript/auto',
          },
          {
            test: /node-gyp-build/,
            loader: 'ignore-loader',
          },
        ],
      },
    },
    resolve: {
      fallback: {
        os: require.resolve('os-browserify/browser'),
        fs: require.resolve('browserify-fs'),
      },
    },
  },
};
