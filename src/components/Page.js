import React, { Component } from 'react'
import ProgressiveImage from 'react-progressive-image-loading'
import { Link } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { FaAngleDoubleDown } from 'react-icons/fa'
import scrollToComponent from 'react-scroll-to-component'
import { isMobile } from 'react-device-detect'
import pushRotateMenu from 'react-burger-menu/lib/menus/pushRotate'
import stackMenu from 'react-burger-menu/lib/menus/stack'
import Texty from 'rc-texty'
import TweenOne from 'rc-tween-one'
import Logo from './Logo'
import PageFooter from './PageFooter'
import { textEnterRandom } from '../utils/textEnter'
import { setVhs, getImageURL, gaConfig } from '../utils/utils'

const menuList = [
  {
    pathname: '/resume',
    title: 'Resume'
  },
  {
    pathname: '/read',
    title: 'Reading List'
  },
  {
    pathname: '/portfolio',
    title: 'Portfolio'
  },
  {
    pathname: '/photos',
    title: 'Photography'
  },
  {
    pathname: '/places',
    title: 'Places'
  }
]

class Page extends Component {
  state = {
    fontSize: 36
  }

  handleScroll = e => {
    // For the "push-rotate" menu, window cannot be used as scrolling element because the menu requires
    // that the outer container has 100vh height and therefore is not scrollable.
    // It also affects the infinite scrollers on some pages (i.e. Photography, Read).
    // "Stack" menu instead of "push-rotate" menu is used on mobile devices because of the scrolling glitches.
    const scrollTop = isMobile
      ? document.documentElement.scrollTop ||
        document.scrollingElement.scrollTop
      : document.getElementById('page-wrap').scrollTop

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
    const logo = document.querySelector('.bm-burger-button')
    if (logo != null) {
      logo.style.transform = `rotate(${scrollTop}deg)`
    }
  }

  // set vh-related styles on mobile devices
  setVhStyles = () => setVhs(false)

  // split text into words for animation
  getSplit = e => {
    const t = e.split(' ')
    const c = []
    t.forEach((str, i) => {
      c.push(<span key={`${str}-${i}`}>{str}</span>)
      if (i < t.length - 1) {
        c.push(<span key={` -${i}`}> </span>)
      }
    })
    return c
  }

  componentDidMount() {
    let scrollingElement = isMobile
      ? window
      : document.getElementById('page-wrap')
    scrollingElement.addEventListener('scroll', this.handleScroll)
    if (isMobile) {
      this.setVhStyles()
      // deviceorientation has been disabled by default since iOS 12.2
      scrollingElement.addEventListener('resize', this.setVhStyles)
    }

    gaConfig()

    if (this.props.location.backId != null)
      sessionStorage.setItem('backId', this.props.location.backId)
    else sessionStorage.removeItem('backId')
  }

  componentWillUnmount() {
    let scrollingElement = isMobile
      ? window
      : document.getElementById('page-wrap')
    scrollingElement.removeEventListener('scroll', this.handleScroll)
    if (isMobile)
      scrollingElement.removeEventListener('resize', this.setVhStyles)
  }

  render() {
    const Menu = isMobile ? stackMenu : pushRotateMenu
    return (
      <div
        style={{ overflowX: 'hidden', height: isMobile ? 'auto' : '100vh' }}
        id="outer-container"
      >
        <div className="menu-wrap">
          <Menu
            className="noselect"
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
            customBurgerIcon={
              <div>
                <Logo radius={12} colors={['#555', '#555']} />
              </div>
            }
          >
            <div className="bm-logo">
              <Logo radius={30} colors={['#555', '#555']} />
            </div>
            <Link
              to={{ pathname: '/', backId: this.props.location.backId }}
              style={{ fontWeight: 'bold', marginBottom: '20px' }}
            >
              Back To Home
            </Link>
            {menuList.map(item => (
              <Link
                className={
                  item.pathname === this.props.location.pathname
                    ? 'bm-current-item'
                    : ''
                }
                key={item.title}
                to={{
                  pathname: item.pathname,
                  backId: this.props.location.backId
                }}
              >
                {item.title}
              </Link>
            ))}
          </Menu>
          <span className="menu-text noselect">MENU</span>
        </div>
        <div
          id="page-wrap"
          style={isMobile ? {} : { height: '100%', overflow: 'auto' }}
        >
          <div className="cover">
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
            <h1
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
            </h1>
            <div className="cover-quote">
              <Texty
                enter={textEnterRandom}
                interval={0}
                delay={this.props.delay + 500}
                split={this.getSplit}
              >
                {this.props.quote}
              </Texty>
              <Texty
                className="cover-author"
                enter={textEnterRandom}
                interval={30}
                delay={this.props.delay + 500}
                split={this.getSplit}
              >
                {this.props.author !== '' ? `— ${this.props.author}` : ''}
              </Texty>
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
          <div
            ref={el => (this.content = el)}
            className="cover-content"
            id="cover-content"
          >
            {this.props.children}
          </div>
          {(this.props.showFooter == null || this.props.showFooter) && (
            <PageFooter footerStyle={this.props.footerStyle} />
          )}
        </div>
      </div>
    )
  }
}

export default Page
