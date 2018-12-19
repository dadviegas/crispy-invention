import React, { Component } from 'react';

const themes = ['royal', 'solidVault', 'fireWatch', 'servQuick', 'sunrise', 'mirage', 'stellar'];
class App extends Component {
  state = {
    themeIndex: 0,
  }

  componentWillMount() {
  }

  render() {
    const { themeIndex } = this.state;
    return <section id="theme-background" className={themes[themeIndex]}>Hello React!</section>;
  }
}

export default App;
