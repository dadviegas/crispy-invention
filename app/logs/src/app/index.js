import React, { PureComponent } from 'react';

const themes = ['royal', 'solidVault', 'fireWatch', 'servQuick', 'sunrise', 'mirage', 'stellar'];
class App extends PureComponent {
  render() {
    return <section id="theme-background" className={themes[0]}>logs</section>;
  }
}

export default App;
