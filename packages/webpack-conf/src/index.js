import getPlugins from './plugins';
import getModules from './modules';
import getParams from './params';
import logger from './logger';

export default (confOptions) => {
  const { _, color, colors, infoVerbosity, $0, ...rest} = confOptions
  var getRepoInfo = require('git-repo-info');

  // https://github.com/rwjblue/git-repo-info
  var info = getRepoInfo();
  const global = {
    author: info.author,
    branch: info.branch,
    commitMessage: info.commitMessage,
    abbreviatedSha: info.abbreviatedSha,
    sha: info.sha,
  };

  const options = getParams(rest, global);

  logger.objLog('Define Variables', options.global)
  logger.objLog('Options', rest)

  return {
    devtool: options.devTool,
    mode: options.mode,
    module: getModules(options),
    output: {
      path: options.paths.dist,
      filename: `js/[name].v${options.version}.${options.mode}.${info.abbreviatedSha}.js`,
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
    }
  }
}
