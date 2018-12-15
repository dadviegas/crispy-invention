import webpackConfiguration from '@dadv/webpack-conf';
import params from './setup/params';

export default (env, argv) =>
  webpackConfiguration({
    ...params(env, argv),
    ...env,
    ...argv,
  });
