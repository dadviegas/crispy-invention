import '@babel/polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from './app';
import store from './config';

import '../styles/core.scss';

import Logger from '@asgard/log-notifier';

if (debugServer) {
  const logger = new Logger(debugServer);
  logger.setDevice('mac');
  logger.initialize();

  fetch(`${debugServer}/api/logs/device/b4ceb468-6ca7-4a6e-bf31-0fc66de91093`).then((r) => r.json()).then((r) => console.info(r));
}

const node = (elementId) => document.getElementById(elementId);

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
        <Component />
    </Provider>,
    node('root'),
  );
};

if (module.hot) {
  module.hot.accept();
}

render(App);

console.log(1)
console.info(1)
console.debug(1)
console.warn(1)
console.error(1)
