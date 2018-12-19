import packageJson from '../package.json'
import path from 'path';
import yamlConfig from '@asgard/yaml-config';
import localIp from '@asgard/local-ip';

export const resolve = (folder = '') => path.resolve(__dirname, folder);

const ENVIRONMENT = {
  PRODUCTION: 'production',
  TEST: 'test',
  DEVELOPMENT: 'development',
  CUSTOM: 'custom',
}

var transformeOptions = [
  { key: 'LOG_SERVER_IP', value: localIp},
  { key: 'LOG_SERVER_PORT', value: 2001},
];

export default ({ env = {}, args }) => {
  env.mode = env && env.mode || ENVIRONMENT.PRODUCTION;
  return {
    env: yamlConfig({
      file: resolve('./environment.yaml'),
      environment: env.mode,
      overrideConfig: env,
    }),
    args: yamlConfig({
      file: resolve('./args.yaml'),
      environment: env.mode,
      transformOptions: transformeOptions,
      overrideConfig: args,
    }),
    config: {
      name: packageJson.name,
      version: packageJson.version,
      plugins: {
        html: {
          template: resolve('../assets/index.html'),
          title: packageJson.description,
        },
        css: {
          styles: resolve('../styles'),
        },
      },
    },
    webpackConf: {
      output: {
        path: resolve('../dist'),
        filename: `js/[name].${env.mode}.v${packageJson.version}.js`,
      },
      stats: 'errors-only',
    },
  };
}
