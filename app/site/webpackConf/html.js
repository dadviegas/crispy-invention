import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';

export default (options = {}) => new HtmlWebPackPlugin({
  filename: "./index.html",
  inject: "body",
  title: "site",
  template: path.resolve(__dirname, '../assets/index.html'),
  ...options,
});
