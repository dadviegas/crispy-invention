import packageJson from '../package.json'
import path from 'path';
import yamlConfig from '@dadv/yaml-config';

const getLocation = (folder = '') => path.resolve(__dirname, folder);

export default (options = { mode: 'development' }) => ({
  name: packageJson.name,
  version: packageJson.version,
  global: yamlConfig(getLocation('./config.yaml'), options.mode),
  plugins: {
    html: {
      template: getLocation('../assets/index.html'),
      title: packageJson.description,
    },
    css: {
      styles: getLocation('../styles'),
    },
  },
  webpack: {
    output: {
      path: getLocation('dist'),
      filename: `js/[name].${options.mode}.v${packageJson.version}.js`,
    },
  }
});
