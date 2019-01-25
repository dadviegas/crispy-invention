import React, { Component } from 'react';
import styled from 'styled-components';

const themes = ['sky-gradient-14', 'premium-dark', 'loon', 'fine', 'royal', 'solidVault', 'fireWatch', 'servQuick', 'sunrise', 'mirage', 'stellar'];

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  font-style: italic;
  font-weight: 400;
`;

const Title1 = styled.h1`
  font-size: 1em;
  text-align: center;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  margin-top: 22%;
  background: transparent;
`;
class App extends Component {
  state = {
    themeIndex: 4,
  }

  // componentWillMount() {
  //   setInterval(() => {
  //     const { themeIndex } = this.state;
  //     this.setState({
  //       themeIndex: themeIndex + 1,
  //     });
  //   }, 2000);
  // }

  render() {
    const { themeIndex } = this.state;
    return (
      <section id="theme-background" className={themes[themeIndex % themes.length]}>
        <Wrapper>
          <Title className="tracking-in-contract-bck"> Crispy Invention </Title>
          <Title1 className="tracking-in-contract-bck-bottom">
            Do it today and do not wait for tomorow!
          </Title1>
        </Wrapper>
      </section>
    );
  }
}

export default App;
