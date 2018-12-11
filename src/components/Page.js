import React, { Component } from 'react'
import ProgressiveImage from 'react-progressive-image-loading'
import { Link } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { FaAngleDoubleDown } from 'react-icons/fa'
import { MdArrowBack } from 'react-icons/md'
import scrollToComponent from 'react-scroll-to-component'
import { Tooltip } from 'reactstrap'
import { isMobile } from 'react-device-detect'
import Texty from 'rc-texty'
import TweenOne from 'rc-tween-one'
import Logo from './Logo'
import PageFooter from './PageFooter'
import { setVhs, getImageURL, gaConfig } from '../utils/utils'

class Page extends Component {
  state = {
    fontSize: 36,
    logoTooltip: false,
    showLogo: true
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
      document.querySelector('.scroll-to-content'),
      document.querySelector('.cover-canvas')
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
    const logo = document.getElementById('cover-logo')
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

    gaConfig()

    if (this.props.location.backId != null)
      sessionStorage.setItem('backId', this.props.location.backId)
    else sessionStorage.removeItem('backId')
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    if (isMobile)
      window.removeEventListener('deviceorientation', this.setVhStyles)
  }

  render() {
    return (
      <div style={{ overflowX: 'hidden' }}>
        <div className="cover">
          <div
            onMouseEnter={() => this.setState({ showLogo: false })}
            onMouseLeave={() => this.setState({ showLogo: true })}
          >
            {this.state.showLogo && (
              <div id="cover-logo" className="cover-logo">
                <Link
                  to={{ pathname: '/', backId: this.props.location.backId }}
                >
                  <Logo radius={12} colors={['#555', '#555']} />
                </Link>
              </div>
            )}
            {!this.state.showLogo && (
              <div className="cover-back-home-wrap">
                <div className="cover-logo">
                  <div style={{ visibility: 'hidden' }}>
                    <Logo radius={12} colors={['#555', '#555']} />
                  </div>
                </div>
                <div className="cover-back-home">
                  <Link
                    to={{ pathname: '/', backId: this.props.location.backId }}
                  >
                    <MdArrowBack size={24} color="#555" />
                  </Link>
                  <span>HOME</span>
                </div>
              </div>
            )}
          </div>
          {this.state.showLogo && (
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
          )}
          {this.props.backgroundFilename != null && (
            <ProgressiveImage
              preview={
                process.env.NODE_ENV === 'development'
                  ? `/images/${this.props.backgroundFilename}.jpg`
                  : getImageURL(`${this.props.backgroundFilename}.jpg`, {
                      f: 'auto',
                      c: 'fill',
                      w: Math.min(window.innerWidth * 0.3, 800),
                      h: Math.min(window.innerHeight * 0.3, 800)
                    })
              }
              src={
                process.env.NODE_ENV === 'development'
                  ? `/images/${this.props.backgroundFilename}.jpg`
                  : getImageURL(`${this.props.backgroundFilename}.jpg`, {
                      f: 'auto',
                      c: 'fill',
                      w: window.innerWidth * window.devicePixelRatio,
                      h: window.innerHeight * window.devicePixelRatio
                    })
              }
              render={(src, style) => (
                <div
                  className="cover-image"
                  style={Object.assign(style, {
                    backgroundImage: `url(${src})`
                  })}
                />
              )}
            />
          )}
          {this.props.background}
          <div
            className="cover-title noselect"
            onClick={this.props.onTitleClick}
            style={this.props.titleStyle}
          >
            <Texty
              component="span"
              className="cover-title-text"
              type="scaleBig"
              mode="smooth"
              delay={this.props.delay}
            >
              YI
            </Texty>
            <TweenOne
              component="span"
              className="cover-title-cross"
              animation={{
                opacity: 0,
                scale: 2,
                type: 'from',
                delay: this.props.delay + 1000
              }}
            >
              <FiX size={this.state.fontSize} color="#0d8aba" />
            </TweenOne>
            <Texty
              component="span"
              className="cover-title-text"
              type="scaleBig"
              mode="smooth"
              delay={this.props.delay + 150}
            >
              {this.props.title}
            </Texty>
          </div>
          <div className="cover-quote">
            <TweenOne
              animation={{
                opacity: 0,
                translateY: 100,
                type: 'from',
                delay: this.props.delay + 500
              }}
            >
              {this.props.quote}
            </TweenOne>
            <TweenOne
              animation={{
                opacity: 0,
                translateY: 100,
                type: 'from',
                delay: this.props.delay + 750
              }}
              className="cover-author"
            >
              {this.props.author !== '' ? `— ${this.props.author}` : ''}
            </TweenOne>
          </div>
          <TweenOne
            animation={{
              opacity: 0,
              translateY: 100,
              type: 'from',
              delay: this.props.delay + 1000
            }}
            className="scroll-to-content"
            onClick={() => scrollToComponent(this.content, { align: 'top' })}
          >
            <div className="cover-scroll-arrow">
              <FaAngleDoubleDown size={24} />
            </div>
          </TweenOne>
        </div>
        <div ref={el => (this.content = el)} className="cover-content">
          {this.props.children}
        </div>
        {(this.props.showFooter == null || this.props.showFooter) && (
          <PageFooter footerStyle={this.props.footerStyle} />
        )}
      </div>
    )
  }
}

export default Page
