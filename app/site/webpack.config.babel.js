import webpackConfiguration from '@dadv/webpack-conf';
import params from './setup/params';
import yamlConfig from '@dadv/yaml-config';

console.log(yamlConfig('./config.yaml'));

export default (env, argv) =>
  webpackConfiguration({
    ...params(env, argv),
    ...env,
    ...argv,
  });
