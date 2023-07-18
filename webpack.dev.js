import { merge } from 'webpack-merge';
import path from 'path';
import common from './webpack.common.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dev-bundle.cjs',
  },
});
