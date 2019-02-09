import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initialize } from '@asgard/log-notifier';
import App from './app';
import store from './config';

import '../styles/core.scss';

const dynamicLog = data => console[data.logLevel].call(this, data);
console.log('IS_LOG_SERVER_ACTIVE', IS_LOG_SERVER_ACTIVE)
if (IS_LOG_SERVER_ACTIVE) {
  initialize(LOG_SERVER, {
    actionCallback: dynamicLog,
    eventCallback: dynamicLog,
  });
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