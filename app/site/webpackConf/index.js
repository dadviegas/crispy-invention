import babel from './babel';
import htmlPlugin from './html';

import getParams from './params';

export default (confOptions) => {
  const options = getParams(confOptions);

  return {
    devtool: options.devTool,
    mode: options.mode,
    module: {
      rules: [
        babel,
      ],
    },
    output: {
      path: options.paths.dist,
      filename: `[name].v${options.version}.${options.mode}.js`,
    },
    plugins: [
      htmlPlugin(options.html),
    ],
    optimization: {
      splitChunks: {
          chunks: 'all',
      },
      runtimeChunk: true,
    }
  }
}
