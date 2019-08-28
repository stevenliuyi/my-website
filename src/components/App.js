import React, { Component } from 'react'
import './App.css'
import 'babel-polyfill'
import ScrollAnim from 'rc-scroll-anim'
import 'bootstrap/dist/css/bootstrap.css'
import { FaAngleDoubleUp, FaCaretRight } from 'react-icons/fa'
import {
  animateScroll as scroll,
  Element as ScrollElement,
  scroller
} from 'react-scroll'
import { isMobile } from 'react-device-detect'
import Menu from 'react-burger-menu/lib/menus/slide'
import Front from './Front'
import About from './About'
import Skills from './Skills'
import Research from './Research'
import Projects from './Projects'
import More from './More'
import Footer from './Footer'
import Logo from './Logo'
import '../fonts.css'
import { setVhs, gaConfig } from '../utils/utils.js'

const Link = ScrollAnim.Link
const EventListener = ScrollAnim.Event

const pageIds = {
  About: 'about-page',
  Skills: 'skill-page',
  Research: ' research-page',
  Projects: 'project-page',
  More: 'more-page'
}

class App extends Component {
  state = {
    delay: 50,
    width: 0,
    menuOpen: false,
    currentSection: ''
  }

  componentDidMount() {
    // scroll to specific position
    const backId =
      this.props.location.backId || sessionStorage.getItem('backId')
    if (backId != null) {
      const backElem = document.getElementById(backId)
      if (backElem != null) {
        backElem.scrollIntoView()
      } else {
        scroll.scrollToTop()
      }
    } else {
      scroll.scrollToTop()
    }

    this.handleScroll()

    EventListener.addEventListener('resize.userResize', this.barAnimate)

    window.addEventListener('scroll', this.handleScroll)
    this.setWidth()
    window.addEventListener('resize', this.setWidth)

    // set vh-related styles on mobile devices
    if (isMobile) {
      setVhs()
      // deviceorientation has been disabled by default since iOS 12.2
      window.addEventListener('resize', setVhs)
    }

    gaConfig()
  }

  componentWillUnmount() {
    EventListener.removeEventListener('resize.userResize', this.barAnimate)

    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.setWidth)
    if (isMobile) window.removeEventListener('resize', setVhs)
  }

  setWidth = () => {
    this.setState({ width: document.documentElement.clientWidth })
  }

  onMenuItemClick = section => {
    this.setState({ menuOpen: false, currentSection: section })

    // hack to navigate to the correct poisition
    scroller.scrollTo(pageIds[section], { smooth: false })
    setTimeout(() => {
      scroller.scrollTo(pageIds[section], { smooth: false })
    }, 10)
  }

  activeMenuItem = section =>
    this.state.currentSection === section
      ? 'nav-burger-item'
      : 'nav-burger-item nav-burger-inactive-item'

  handleScroll() {
    let nav = document.querySelector('.nav')
    let burger = document.querySelector('.nav-burger')
    let birds = document.querySelectorAll('.bird-container')
    if (nav == null || burger == null) return
    let el = document.scrollingElement || document.documentElement
    if (el.scrollTop > window.innerHeight) {
      nav.style.position = 'fixed'
      nav.style.top = 0
      burger.style.visibility = 'visible'
      // stop bird animation
      if (birds != null) birds.forEach(b => (b.style.display = 'none'))
    } else {
      nav.style.position = 'absolute'
      nav.style.top = 'auto'
      burger.style.visibility = 'hidden'
      // resume bird aniimation
      if (birds != null) birds.forEach(b => (b.style.display = 'inherit'))
    }
  }

  onFocus = e => {
    this.dom = e.target
    if (this.dom) this.setState({ currentSection: this.dom.innerText })
    this.barAnimate()
  }

  barAnimate = () => {
    if (!this.dom) return
    const boundingBox = this.dom.getBoundingClientRect()
    this.bar.style.left = `${boundingBox.left}px`
    this.bar.style.width = `${boundingBox.width}px`
  }

  scrollToNav = () => {
    scroller.scrollTo('nav', { duration: 800, smooth: 'easeInOutQuad' })
  }

  scrollToTop = () => {
    scroll.scrollToTop({ duration: 1000, smooth: 'easeInOutQuad' })
  }

  render() {
    const radiusSVG = (
      <svg width={this.state.width * 0.5} height="27">
        <path
          d={`M ${25 / Math.sqrt(2)} ${25 / Math.sqrt(2) + 2} C ${25 *
            Math.sqrt(2)} 2, ${25 * Math.sqrt(2)} 2, ${25 / Math.sqrt(2) +
            25 * Math.sqrt(2)} 2 H 1500 V 0 H 0 V 27 A 25 25 0 0 0 ${25 /
            Math.sqrt(2)} ${25 / Math.sqrt(2) + 2}`}
          fill="#fff"
        />
      </svg>
    )

    return (
      <div
        style={{
          overflowX: 'hidden' // avoid horizontal scroll, which is especially annoying on mobile phones
        }}
      >
        <Front
          scrollToNav={this.scrollToNav}
          onTyped={() => {
            if (!this.state.linkShown) this.setState({ linkShown: true })
          }}
        />
        <ScrollElement name="nav" className="nav">
          <div className="nav-wrap noselect">
            <Link className="nav-list" to="about-page" onFocus={this.onFocus}>
              About
            </Link>
            <Link className="nav-list" to="skill-page" onFocus={this.onFocus}>
              Skills
            </Link>
            <Link
              className="nav-list"
              to="research-page"
              onFocus={this.onFocus}
            >
              Research
            </Link>
            <Link className="nav-list" to="project-page" onFocus={this.onFocus}>
              Projects
            </Link>
            <Link className="nav-list" to="more-page" onFocus={this.onFocus}>
              More
            </Link>
            <div ref={el => (this.bar = el)} className="nav-bar" />
            <div className="nav-mobile">{this.state.currentSection}</div>
            <div className="nav-burger">
              <Menu
                right
                width={Math.min(300, window.innerWidth*.6)}
                isOpen={this.state.menuOpen}
                onStateChange={state => {
                  this.setState({ menuOpen: state.isOpen })
                  const menu = document.querySelector('.bm-menu')
                  if (menu == null) return
                  if (state.isOpen) {
                     menu.classList.add('bm-menu-active')
                  } else {
                     menu.classList.remove('bm-menu-active')
                  }
                }
                }
              >
                <div className="nav-logo" onClick={this.scrollToTop}>
                  <Logo radius={30} colors={['#aaa', '#aaa']} />
                </div>
                {Object.keys(pageIds).map(section => (
                  <div
                    key={section}
                    className="nav-burger-item-wrap"
                    onClick={() => this.onMenuItemClick(section)}
                  >
                    <span className={this.activeMenuItem(section)}>
                      <FaCaretRight />
                    </span>
                    <span>{section}</span>
                  </div>
                ))}
              </Menu>
            </div>
          </div>
        </ScrollElement>
        <About {...this.state} />
        <Skills {...this.state} />
        <Research {...this.state} />
        <Projects {...this.state} />
        <More {...this.state} />
        <div className="scroll-to-top" onClick={this.scrollToTop}>
          <div className="scroll-arrow">
            <FaAngleDoubleUp size={24} />
          </div>
        </div>
        <div className="scroll-to-top-radius-left">{radiusSVG}</div>
        <div className="scroll-to-top-radius-right">{radiusSVG}</div>
        <div className="scroll-to-top-radius" />
        <Footer {...this.state} />
      </div>
    )
  }
}

export default App
