import React, { Component } from "react";

const themes = ['royal', 'solidVault', 'fireWatch', 'servQuick', 'sunrise', 'mirage', 'stellar'];
class App extends Component {
  state = {
    theme: 'servQuick',
    i: 0,
  }
themes
  componentWillMount() {
  }

  render() {
    return <section id="theme-background" className={this.state.theme}>logs</section>;
  }
};

export default App;
