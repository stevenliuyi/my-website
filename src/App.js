import React, { Component } from 'react';
import './App.css';
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'
import 'babel-polyfill'
import { TiPencil, TiCode } from 'react-icons/ti'

class App extends Component {
  state = {
    linkShown: false
  }

  componentDidUpdate({ linkShown}) {
    if (!linkShown && this.state.linkShown) {
            let elem = document.querySelector('.main-links')
            elem.style.opacity = 1
            elem.style.marginTop = '50px'

    }
  }

  render() {
    return (
      <div className="background">
        <Typist
          className="title"
          startDelay={1200}
          avgTypingDelay={100}
          onCharacterTyped={() => {if (!this.state.linkShown) this.setState({ linkShown: true })}}
        >
          <span>hi, I'm Yi Liu</span>
          <Typist.Backspace count={6} delay={1000} />
          <span>Steven.</span>
        </Typist>
        <div className="main-links">
          <a href="https://blog.yliu.io">
            <span className="main-link">
              <TiPencil size={14} className="main-icon"/>
              <span className="main-link-text">blog</span>
            </span>
          </a>
          <a href="https://github.com/stevenliuyi">
            <span className="main-link">
              <TiCode size={14} className="main-icon" />
              <span className="main-link-text">github</span>
            </span>
          </a>
        </div>
      </div>
    );
  }
}

export default App;
