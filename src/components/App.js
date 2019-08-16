import React, { Component } from 'react'
import './App.css'
import 'babel-polyfill'
import ScrollAnim from 'rc-scroll-anim'
import 'bootstrap/dist/css/bootstrap.css'
import { FaAngleDoubleUp } from 'react-icons/fa'
import scrollToComponent from 'react-scroll-to-component'
import { isMobile } from 'react-device-detect'
import Menu from 'react-burger-menu/lib/menus/stack'
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
        scrollToComponent(this.top, { align: 'top' })
      }
    } else {
      scrollToComponent(this.top, { align: 'top' })
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

  onMenuItemClick = () => this.setState({ menuOpen: false })

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
    scrollToComponent(this.nav, { align: 'top' })
  }

  scrollToTop = () => {
    scrollToComponent(this.top, { align: 'top', duration: 500 })
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
          ref={el => (this.top = el)}
          scrollToNav={this.scrollToNav}
          onTyped={() => {
            if (!this.state.linkShown) this.setState({ linkShown: true })
          }}
        />
        <div className="nav" ref={el => (this.nav = el)}>
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
              <Menu right isOpen={this.state.menuOpen}>
                <div className="nav-logo" onClick={this.scrollToTop}>
                  <Logo radius={30} colors={['#aaa', '#aaa']} />
                </div>
                <Link to="about-page" onClick={this.onMenuItemClick}>
                  About
                </Link>
                <Link to="skill-page" onClick={this.onMenuItemClick}>
                  Skills
                </Link>
                <Link to="research-page" onClick={this.onMenuItemClick}>
                  Research
                </Link>
                <Link to="project-page" onClick={this.onMenuItemClick}>
                  Projects
                </Link>
                <Link to="more-page" onClick={this.onMenuItemClick}>
                  More
                </Link>
              </Menu>
            </div>
          </div>
        </div>
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
