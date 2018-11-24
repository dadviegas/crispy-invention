import packageJson from '../package.json'
import path from 'path';
const getFolder = (folder = '') => path.resolve(__dirname, '..', folder);

export default (options = {}) => ({
  name: packageJson.name,
  version: packageJson.version,
  global: {
  },
  plugins: {
    html: {
      template: getFolder('assets/index.html'),
      title: packageJson.description,
    },
    css: {
      styles: getFolder('styles'),
    },
  },
  webpack: {
    output: {
      path: getFolder('dist'),
      filename: `js/[name].${options.mode || 'development'}.v${packageJson.version}.js`,
    },
  }
});
