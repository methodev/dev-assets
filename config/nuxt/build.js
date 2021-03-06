import webpack from 'webpack';

const envIsDev = process.env.NODE_ENV === 'development';

export default ({ banner }) => ({
  extend(config, { isDev }) {
    if (isDev) config.resolve.symlinks = false;
  },

  babel: {
    presets({ isServer }) {
      return [
        [
          require.resolve('@nuxt/babel-preset-app'),
          // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
          {
            buildTarget: isServer ? 'server' : 'client',
            corejs: { version: 3 }
          }
        ]
      ];
    }
  },

  cssSourceMap: envIsDev,

  postcss: {
    plugins: {
      'postcss-easing-gradients': {},
      'postcss-flexbugs-fixes': {},
      'postcss-preset-env': {},
      'postcss-utilities': {},
      'postcss-import': {},
      'css-mqpacker': {},
      'postcss-discard-comments': {
        removeAll: true
      }
    }
  },

  loaders: {
    cssModules: {
      localsConvention: 'dashes',
      modules: {
        localIdentName: envIsDev
          ? '[name]__[local]__[hash:base64:5]'
          : '[hash:base64:5]'
      }
    }
  },

  plugins: envIsDev ? [] : [new webpack.BannerPlugin({ banner })]
});
