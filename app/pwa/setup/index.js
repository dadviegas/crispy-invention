
import path from 'path';
import fs from 'fs';
import WebpackPwaManifest from 'webpack-pwa-manifest';

import yamlConfig from '@asgard/yaml-config';
import localIp from '@asgard/local-ip';

import packageJson from '../package.json';

export const resolve = (folder = '') => path.resolve(__dirname, folder);

const ENVIRONMENT = {
  PRODUCTION: 'production',
  TEST: 'test',
  DEVELOPMENT: 'development',
  CUSTOM: 'custom',
};

const transformeOptions = [
  { key: 'LOG_SERVER_IP', value: localIp },
  { key: 'LOG_SERVER_PORT', value: 2001 },
];

export default ({ env = {}, args }) => {
  env.mode = (env && env.mode) || ENVIRONMENT.PRODUCTION; // eslint-disable-line
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
      devtool: 'none',
      output: {
        path: resolve('../dist'),
        filename: `js/[name].${env.mode}.v${packageJson.version}.js`,
      },
      stats: 'errors-only',
      plugins: [
        new WebpackPwaManifest({
          name: 'My Progressive Web App',
          short_name: 'MyPWA',
          description: 'My awesome Progressive Web App!',
          background_color: '#ffffff',
          crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
        }),
      ],
    },
    devServer: {
      https: {
        key: fs.readFileSync('./local/server_key.pem'),
        cert: fs.readFileSync('./local/server_cert.pem'),
        ca: fs.readFileSync('./local/server_cert.pem'),
      },
    },
  };
};
