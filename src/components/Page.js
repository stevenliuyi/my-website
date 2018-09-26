import React, { Component } from 'react'
import ProgressiveImage from 'react-progressive-image-loading'
import { Link } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { FaAngleDoubleDown } from 'react-icons/fa'
import scrollToComponent from 'react-scroll-to-component'
import { Tooltip } from 'reactstrap'
import { isMobile } from 'react-device-detect'
import Logo from './Logo'
import { setVhs } from '../utils/utils'

class Page extends Component {
  state = {
    fontSize: 36,
    logoTooltip: false
  }

  handleScroll = e => {
    const scrollTop =
      document.documentElement.scrollTop || document.scrollingElement.scrollTop

    // blur
    const ratio = 1
    const maxBlur = 20
    const opacity =
      scrollTop > ratio * window.innerHeight
        ? 0
        : 1 - scrollTop / window.innerHeight / ratio
    const blur =
      scrollTop > ratio * window.innerHeight
        ? maxBlur
        : (scrollTop / window.innerHeight / ratio) * maxBlur

    const blurElements = [
      document.querySelector('.cover-image'),
      document.querySelector('.cover-quote'),
      document.querySelector('.scroll-to-content')
    ]
    blurElements.forEach(el => {
      if (el != null) {
        el.style.opacity = opacity
        el.style.filter = `blur(${blur}px)`
        el.style.WebkitFilter = `blur(${blur}px)`
      }
    })

    // title
    const title = document.querySelector('.cover-title')
    const startFontSize = 36
    const endFontSize = 20
    const initPos = 0.3
    if (title != null) {
      if (scrollTop > window.innerHeight * initPos) {
        title.style.position = 'fixed'
        title.style.top = 0
        const fontSize =
          scrollTop > window.innerHeight
            ? endFontSize
            : startFontSize -
              ((scrollTop / window.innerHeight - initPos) *
                (startFontSize - endFontSize)) /
                (1 - initPos)
        this.setState({ fontSize })
        title.style.fontSize = `${fontSize}px`
      } else {
        title.style.position = 'absolute'
        title.style.top = `${initPos * 100}%`
        title.style.fontSize = '36px'
      }
    }

    // logo
    const logo = document.querySelector('.cover-logo')
    if (logo != null) {
      logo.style.transform = `rotate(${scrollTop}deg)`
    }
  }

  // set vh-related styles on mobile devices
  setVhStyles = () => setVhs(false)

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    if (isMobile) {
      this.setVhStyles()
      window.addEventListener('deviceorientation', this.setVhStyles)
    }
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.handleScroll)
    if (isMobile)
      window.removeEventListener('deviceorientation', this.setVhStyles)
  }

  render() {
    return (
      <div>
        <div className="cover">
          <div id="cover-logo" className="cover-logo">
            <Link to="/">
              <Logo radius={12} colors={['#555', '#555']} />
            </Link>
          </div>
          <Tooltip
            placement="right"
            target="cover-logo"
            isOpen={this.state.logoTooltip}
            toggle={() =>
              this.setState({ logoTooltip: !this.state.logoTooltip })
            }
          >
            back to homepage
          </Tooltip>
          <ProgressiveImage
            preview={`/images/${this.props.backgroundFilename}-small.jpg`}
            src={`/images/${this.props.backgroundFilename}.jpg`}
            render={(src, style) => (
              <div
                className="cover-image"
                style={Object.assign(style, { backgroundImage: `url(${src})` })}
              />
            )}
          />
          <div
            className="cover-title noselect"
            onClick={this.props.onTitleClick}
          >
            <span>YI</span>
            <FiX size={this.state.fontSize} color="#0d8aba" />
            <span>{this.props.title}</span>
          </div>
          <div className="cover-quote">
            <div>{this.props.quote}</div>
            <div className="cover-author">{`— ${this.props.author}`}</div>
          </div>
          <div
            className="scroll-to-content"
            onClick={() => scrollToComponent(this.content, { align: 'top' })}
          >
            <div className="cover-scroll-arrow">
              <FaAngleDoubleDown size={24} />
            </div>
          </div>
        </div>
        <div
          ref={el => (this.content = el)}
          style={{ minHeight: '100vh', width: '100%' }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Page
