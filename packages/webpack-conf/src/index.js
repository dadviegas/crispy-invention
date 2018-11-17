import getPlugins from './plugins';
import getModules from './modules';
import getParams from './params';

export default (confOptions) => {
  const options = getParams(confOptions);

  return {
    devtool: options.devTool,
    mode: options.mode,
    module: getModules(options),
    output: {
      path: options.paths.dist,
      filename: `js/[name].v${options.version}.${options.mode}.js`,
    },
    plugins: getPlugins(options),
    optimization: {
      splitChunks: {
          chunks: 'all',
      },
      runtimeChunk: true,
      usedExports: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },
  }
}
