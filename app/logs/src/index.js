import '@babel/polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from './app';
import store from './config';

import '../styles/core.scss';

import { initialize } from '@dadv/log-notifier';

const dynamicLog = (data) => console[data.logLevel].call(this, data);

if (debugServer) {
  initialize(debugServer, {
    actionCallback: dynamicLog,
    eventCallback: dynamicLog,
  });
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