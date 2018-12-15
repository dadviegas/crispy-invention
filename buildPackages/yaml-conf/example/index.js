const config = require('../src').default;

var variables = [
  { key: 'test1', value: '_test1_'},
  { key: 'test2', value: '_test2_'},
];

const a = config('./example/config.yml', 'test', variables);
const b = config('./example/config.yml', 'development', variables);
const c = config('./example/config.yml', 'production', variables);
const d = config('./example/config.yml', 'production');

console.log(a);
console.log(b);
console.log(c);

console.log(d);