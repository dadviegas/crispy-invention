import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import htmlPlugin from './html';

export default (options = {}) => [
  htmlPlugin(options),
  new MiniCssExtractPlugin({
    path: options.paths.styles,
    filename: `styles/[name].v${options.version}.css`,
  }),
].filter(plugin => plugin);
