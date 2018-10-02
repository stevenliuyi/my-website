import React, { Component } from 'react'
import './App.css'
import 'babel-polyfill'
import ScrollAnim from 'rc-scroll-anim'
import 'bootstrap/dist/css/bootstrap.css'
import { FaAngleDoubleUp } from 'react-icons/fa'
import scrollToComponent from 'react-scroll-to-component'
import { isMobile } from 'react-device-detect'
import Front from './Front'
import About from './About'
import Skills from './Skills'
import Research from './Research'
import Projects from './Projects'
import More from './More'
import Footer from './Footer'
import '../iconfont.css'
import { setVhs } from '../utils/utils.js'

const Link = ScrollAnim.Link
const EventListener = ScrollAnim.Event

class App extends Component {
  state = {
    delay: 150,
    width: 0
  }

  setWidth = () => {
    this.setState({ width: document.documentElement.clientWidth })
  }

  componentDidMount() {
    // scroll to specific position
    const backId = this.props.location.backId
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

    EventListener.addEventListener('resize.userResize', this.barAnimate)

    window.addEventListener('scroll', this.handleScroll)
    this.setWidth()
    window.addEventListener('resize', this.setWidth)

    // set vh-related styles on mobile devices
    if (isMobile) {
      setVhs()
      window.addEventListener('deviceorientation', setVhs)
    }
  }

  componentWillUnmount() {
    EventListener.removeEventListener('resize.userResize', this.barAnimate)

    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.setWidth)
    if (isMobile) window.removeEventListener('deviceorientation', setVhs)
  }

  handleScroll() {
    let nav = document.querySelector('.nav')
    if (nav == null) return
    let el = document.scrollingElement || document.documentElement
    if (el.scrollTop > window.innerHeight) {
      nav.style.position = 'fixed'
      nav.style.top = 0
    } else {
      nav.style.position = 'absolute'
      nav.style.top = 'auto'
    }
  }

  onFocus = e => {
    this.dom = e.target
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
          </div>
        </div>
        <About ref={el => (this.aboutPage = el)} {...this.state} />
        <Skills {...this.state} />
        <Research {...this.state} />
        <Projects {...this.state} />
        <More {...this.state} />
        <div
          className="scroll-to-top"
          onClick={() =>
            scrollToComponent(this.top, { align: 'top', duration: 500 })
          }
        >
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
