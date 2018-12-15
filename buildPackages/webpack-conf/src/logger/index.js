import chalk from 'chalk';
const log = console.log;

const bold = chalk.bold;
const applyColor = (color) => (...rest) => {
  let str = [];

  rest.forEach((value, ix) => {
    str.push(bold[ix === 0 ? color : 'white'](JSON.stringify(value)));
  });

  log(str.join(': '));
};

const objLog = (key, obj) => {
  logger.line();
  logger.log(key)
  Object.entries(obj).forEach(entry => {
    let key = entry[0];
    let value = entry[1];
    value && logger.debug(key, value);
  });
  logger.line();
}

const logger = {
  info: applyColor('blue'),
  log: applyColor('green'),
  debug: applyColor('yellow'),
  error: applyColor('red'),
  line: () => log(`\n${chalk.yellow("--------------------------------------------------")}\n`),
  objLog,
}

export default logger;

