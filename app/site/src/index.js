import React from "react";
import ReactDOM from "react-dom";
import App from './app';
import '../styles/core.scss';

const render = () => ReactDOM.render(<App />, document.getElementById("root"));

module.hot && module.hot.accept('./app', () => setTimeout(render));

render();