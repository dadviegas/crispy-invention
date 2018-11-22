import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import htmlPlugin from './html';
import { DefinePlugin } from 'webpack';

export default (options = {}) => [
  new DefinePlugin(options.global),
  htmlPlugin(options),
  new MiniCssExtractPlugin({
    path: options.paths.styles,
    filename: `styles/[name].v${options.version}.css`,
  }),
].filter(plugin => plugin);
