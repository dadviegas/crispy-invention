import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import htmlPlugin from './html';

export default (options = {}) => [
  htmlPlugin(options.html),
  new MiniCssExtractPlugin({
      filename: `styles/[name].v${options.version}.css`,
  }),
].filter(plugin => plugin);
