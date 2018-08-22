import React, { Component } from 'react';
import ProgressiveImage from 'react-progressive-image-loading'
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'
import { TiPencil, TiCode } from 'react-icons/ti'
import { IoIosArrowDown } from 'react-icons/io'

class Front extends Component {

  state = {
    linkShown: false
  }

  componentDidUpdate({ linkShown}) {
    if (!linkShown && this.state.linkShown) {
      ['main-links', 'more-text', 'arrow-down'].forEach(showClass => {
        let elem = document.querySelector(`.${showClass}`)
        elem.style.opacity = 1
        elem.style.transform = 'translate(-50%, 0)'
        if (showClass === 'arrow-down') {
          const animation = 'arrow-down-flash linear 1.5s infinite'
          elem.style.animation = animation
          elem.style.WebkitAnimation = animation
        }
      })      
    }
  }

  render() {
    return (
      <div className="background">
        <ProgressiveImage
          preview="/images/fabrice-villard-584622-unsplash-small.jpg"
          src="/images/fabrice-villard-584622-unsplash.jpg"
          render={(src, style) => <div className="background-image" style={Object.assign(style, { backgroundImage: `url(${src})`})} />}
        />
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
        <div className="more-text" onClick={this.props.scrollToNav}>more</div>
        <div className="arrow-down" onClick={this.props.scrollToNav}>
          <IoIosArrowDown size={24} />
        </div>
      </div>
    );
  }
}

export default Front;
