import UAParser from 'ua-parser-js';
import uuidv4 from 'uuid/v4';
import sendData from './send';

window.log = window.log || {};

function Logger(serverUrl) {
  if (!serverUrl) return;

  let deviceId;
  let url = serverUrl;

  const initialize = () => {
    function generic(logLevel, original) {
      const originalFunc = original;
      return function composed() {
        sendData(url, {
          deviceId,
          logLevel,
          message: arguments[0], //eslint-disable-line
          data: arguments[1], //eslint-disable-line
          optionalData: arguments[2], //eslint-disable-line
          extra: arguments[3], //eslint-disable-line,
        }),

        original && originalFunc.apply(this, arguments); //eslint-disable-line
      };
    }

    const overideLogs = ['log', 'error', 'debug', 'info']; //  'warn',
    overideLogs.forEach((element) => {
      console[element] = generic(element, console[element]); //eslint-disable-line
    });
  };

  function setDevice (id) {
    deviceId = id || uuidv4();

    const system = new UAParser();
    sendData(url, {
      deviceId,
      logLevel: 'info',
      message: 'System info', //eslint-disable-line
      data: {
        browser: system.getBrowser(),
        device: system.getDevice(),
        engine: system.getEngine(),
        os: system.getOS(),
        ua: system.getUA(),
      }
    })
  }

  return {
    initialize,
    setDevice,
  }
}

export default Logger;

export function initialize(serverUrl, options) {
  if (!options || !serverUrl) return;

  var socket = require('socket.io-client')(serverUrl);
  socket.on('connect', () => console.warn('socket connected'));
  options.eventCallback && socket.on('event', options.eventCallback);
  options.actionCallback && socket.on('action', options.actionCallback);
  socket.on('disconnect', console.log);

  return socket;
};
