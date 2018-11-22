import webpackConfiguration from 'webpack-conf';
import params from './setup/params';

export default (env, argv) =>
  webpackConfiguration({
    mode: 'development',
    ...params,
    ...env,
    ...argv,
  });
