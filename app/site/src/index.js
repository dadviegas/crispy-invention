import '@babel/polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from './app';
import store from './config';

import '../styles/core.scss';

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