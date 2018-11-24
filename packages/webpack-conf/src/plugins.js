import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import htmlPlugin from './html';
import { DefinePlugin, EnvironmentPlugin } from 'webpack';

export default (config = {}, options) => [
  new EnvironmentPlugin({
    NODE_ENV: options.global.ENV,
    DEBUG: options.global.DEBUG,
  }),
  new DefinePlugin(options.global),
  config.plugins.html && htmlPlugin(config.plugins.html),
  config.plugins.css && new MiniCssExtractPlugin({
    path: config.plugins.css.styles,
    filename: `styles/v${config.mode}[name].v${config.version}.css`,
  }),
].filter(plugin => plugin);
