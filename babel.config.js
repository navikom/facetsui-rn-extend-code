module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  'plugins': [
    [
      require('@babel/plugin-proposal-decorators').default,
      {
        legacy: true
      }
    ],
    [
      'module-resolver',
      {
        root: ['.src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.svg'
        ],
        alias: {
          '@app': ['./src'],
        },
      },
    ],
  ],
};
