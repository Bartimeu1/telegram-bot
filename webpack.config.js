import { fileURLToPath } from 'url';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.cjs',
  },
  target: 'node',
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, './src/models'),
      '@services': path.resolve(__dirname, './src/services'),
      '@constants': path.resolve(__dirname, './src/constants'),
    },
  },
};

export default (env, argv) => {
  if (argv.mode === 'production') {
    config.mode = 'production';
    config.devtool = 'source-map';
    config.optimization = {
      ...(config.optimization || {}),
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_fnames: /AbortSignal/,
          },
        }),
      ],
    };
  }

  return config;
};
