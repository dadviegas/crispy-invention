import React, { Component } from "react";

const themes = ['royal', 'solidVault', 'fireWatch', 'servQuick', 'sunrise', 'mirage', 'stellar'];
class App extends Component {
  state = {
    theme: 'stellar',
    i: 0,
  }
themes
  componentWillMount() {
    // setInterval(() => {
    //   console.log(this.state.i, this.state.i % themes.length)
    //   this.setState({
    //     theme: themes[this.state.i % themes.length],
    //     i: this.state.i + 1,
    //   })
    // }, 3000)
  }

  render() {
    return <section id="theme-background" className={this.state.theme}>Hello React!</section>;
  }
};

export default App;
