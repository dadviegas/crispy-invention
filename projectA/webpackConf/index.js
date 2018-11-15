import babel from './babel';
import path from 'path';
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  filename: "./index.html",
  inject: "body",
  title: "tools",
  template: path.resolve(__dirname, '../src/index.html')
});

export default (options) =>({
  devtool: options.devTool,
  mode: options.mode,
  module: {
    rules: [
      babel,
    ],
  },
  output: {
    path: options.paths.dist,
    filename: `${options.name}-v${options.version}.${options.mode}.js`,
  },
  plugins: [ htmlPlugin ],
});
