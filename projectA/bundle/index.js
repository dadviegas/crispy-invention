import babel from './babel';

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
});
