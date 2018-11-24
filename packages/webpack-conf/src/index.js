import getPlugins from './plugins';
import getModules from './modules';
import getParams from './params';
import logger from './logger';

export default (config) => {
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

  const options = getParams(config, global);

  // logger.objLog('Define Variables', options.global)
  // logger.objLog('Options', config)

  logger.objLog('Options', config)
  logger.objLog('Options', options)

  return {
    devtool: options.devTool || 'source-map',
    mode: options.mode,
    module: getModules(options, options),
    plugins: getPlugins(config, options),
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
    ...config.webpack,
  }
}
