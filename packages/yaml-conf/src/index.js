import yaml from 'yaml-configuration-loader';
import fs from 'fs';
import path from 'path';
import deepmerge from 'deepmerge';

export default (yamlFile, environment = 'production') => {
  const file = path.resolve(process.cwd(), yamlFile);
  const result = yaml.load(fs.readFileSync(file, 'utf8'));
  console.log('sad', result)
  const defaultData = result['default'] || {};
  const environmentData = result[environment] || {};

  return deepmerge(defaultData, environmentData);
}
