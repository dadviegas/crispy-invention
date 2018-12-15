import merge from 'webpack-merge';
import getPlugins from './plugins';
import getModules from './modules';
import getParams from './params';
import logger from './logger';

export default (config) => {
  const getRepoInfo = require('git-repo-info');

  // https://github.com/rwjblue/git-repo-info
  const info = getRepoInfo();
  const global = {
    author: info.author,
    branch: info.branch,
    commitMessage: info.commitMessage,
    abbreviatedSha: info.abbreviatedSha,
    sha: info.sha,
  };

  const options = getParams(config, global);

  logger.objLog('Define Variables', options.global)
  logger.objLog('Define config', config)

  return merge({
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
  }, config.webpack);
}
