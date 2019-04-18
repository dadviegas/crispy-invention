import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Logger from '@asgard/log-notifier';

import App from './app';
import store from './config';
import '../styles/core.scss';

if (IS_LOG_SERVER_ACTIVE) {
  const logger = new Logger(LOG_SERVER);
  logger.setDevice('mac');
  logger.initialize();

  setInterval(() => {
    fetch(`${LOG_SERVER}/api/logs/device/b4ceb468-6ca7-4a6e-bf31-0fc66de91093`, { a: 1 }).then(r => r.json());
  }, 13000);
}

const node = elementId => document.getElementById(elementId);

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
