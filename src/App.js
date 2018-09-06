import React, { Component } from 'react';
import './App.css';
import 'babel-polyfill'
import ScrollAnim from 'rc-scroll-anim'
import 'bootstrap/dist/css/bootstrap.css'
import { FaAngleDoubleUp } from 'react-icons/fa'
import scrollToComponent from 'react-scroll-to-component'
import Front from './Front'
import About from './About'
import Skills from './Skills'
import Research from './Research'
import Projects from './Projects'
import Footer from './Footer'
import './iconfont.css'

const Link = ScrollAnim.Link
const EventListener = ScrollAnim.Event

class App extends Component {

  state = {
    delay: 150
  }

  componentDidMount() {
    EventListener.addEventListener('resize.userResize', this.barAnimate.bind(this))
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let nav = document.querySelector('.nav')
    let el = document.scrollingElement || document.documentElement
    if (el.scrollTop > window.innerHeight) {
      nav.style.position = 'fixed'
      nav.style.top = 0
    } else {
      nav.style.position = 'absolute'
      nav.style.top = 'auto'
    }
  }

  onFocus = (e) => {
    this.dom = e.target
    this.barAnimate()
  }

  barAnimate = () => {
    if (!this.dom) {
      return;
    }
    const bar = this.refs.bar;
    bar.style.left = `${this.dom.getBoundingClientRect().left}px`;
  }

  scrollToNav = () => {
    scrollToComponent(this.nav, { align: 'top' })
  }

  render() {
    return (
      <div>
        <Front ref={ el => this.top = el } scrollToNav={this.scrollToNav} onTyped={() => {
          if (!this.state.linkShown) this.setState({ linkShown: true })
        }} />
        <div className="nav" ref={el => this.nav = el}>
          <div className="nav-wrap">
            <Link className="nav-list" to="about-page" onFocus={this.onFocus}>About</Link>
            <Link className="nav-list" to="skill-page" onFocus={this.onFocus}>Skills</Link>
            <Link className="nav-list" to="research-page" onFocus={this.onFocus}>Research</Link>
            <Link className="nav-list" to="project-page" onFocus={this.onFocus}>Projects</Link>
            <div ref="bar" className="nav-bar" />
          </div>
        </div>
        <About ref={el => this.aboutPage = el} {...this.state} />
        <Skills {...this.state} />
        <Research {...this.state} />
        <Projects {...this.state} />
        <div className="scroll-to-top" onClick={() => scrollToComponent(this.top, { align: 'top', duration: 500 })}>
          <div className="scroll-arrow"><FaAngleDoubleUp size={24} /></div>
        </div>
        <Footer {...this.state} />
      </div>
    );
  }
}

export default App;
