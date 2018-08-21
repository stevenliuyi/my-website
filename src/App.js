import React, { Component } from 'react';
import './App.css';
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'
import 'babel-polyfill'
import ScrollAnim from 'rc-scroll-anim'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { TiPencil, TiCode } from 'react-icons/ti'
import { IoIosArrowDown } from 'react-icons/io'
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import scrollToComponent from 'react-scroll-to-component'

const Link = ScrollAnim.Link
const Element = ScrollAnim.Element
const ScrollOverPack = ScrollAnim.OverPack
const EventListener = ScrollAnim.Event

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

  render() {
    return (
      <div>
        <Element className="background">
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
          <div className="arrow-down" onClick={() => 
            scrollToComponent(this.aboutPage)
          }>
            <IoIosArrowDown size={24} />
          </div>
        </Element>
        <div className="nav">
          <div className="nav-wrap">
            <Link className="nav-list" to="about-page" onFocus={this.onFocus}>About</Link>
            <Link className="nav-list" to="project-page" onFocus={this.onFocus}>Projects</Link>
            <Link className="nav-list" to="contact-page" onFocus={this.onFocus}>Contact</Link>
            <div ref="bar" className="nav-bar" />
          </div>
        </div>
        <ScrollOverPack ref={el => this.aboutPage = el} id="about-page" className="about-page" playScale={0.4}>
          <QueueAnim type="left" key='0' duration={1000} interval={200} leaveReverse={true}>
            <div key='0' className="section-title">ABOUT</div>
            <div key='1' className="underline" />
          </QueueAnim>
          <TweenOne key='1' style={{ opacity: 0, transform: 'rotateY(90deg)'}} animation={{ opacity: 1, rotateY: 0 ,  duration:1000, ease: 'easeInQuart' }}>
            <img className="logo" src="/icons/android-chrome-192x192.png" height={100} width={100} alt="logo" />
          </TweenOne>
          <QueueAnim type="left" key='2' className="about-text" duration={1000} interval={200} delay={[1000,0]} leaveReverse={true}>
            <div key='0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum est id diam ullamcorper cursus. Aenean pharetra dolor eget lorem scelerisque, quis blandit justo finibus. Aliquam a pulvinar nisl. Proin blandit velit sed ipsum pellentesque, ut feugiat enim volutpat. Curabitur turpis lectus, aliquet vitae ante a, facilisis consequat quam. </div>
            <div key='1'>Nulla a egestas nibh. Suspendisse hendrerit magna sed odio dignissim blandit. Morbi pharetra mi non ullamcorper semper. Vestibulum mattis, est eget condimentum blandit, est eros tristique diam, sit amet mattis tellus enim quis augue. Sed sed justo tempus, auctor neque et, placerat nulla. Ut euismod fringilla diam nec varius.</div>
            <div key='2'>Etiam non tortor diam. Aliquam et tempus velit. Nam interdum nunc nec tortor gravida egestas. Curabitur porttitor sodales ante ut ullamcorper.</div>
          </QueueAnim>
        </ScrollOverPack>
        <ScrollOverPack id="project-page" className="project-page" playScale={0.4}>
          <QueueAnim type="left" key='0' duration={1000} interval={200} delay={[0,1000]} leaveReverse={true}>
            <div key='0' className="section-title">PROJECTS</div>
            <div key='1' className="underline" />
          </QueueAnim>
          <QueueAnim type="bottom" key='1' className="projects" duration={2000} interval={0} delay={[1000, 0]}>
          { [...Array(6).keys()].map(i => (
            <Card key={i} className="project-card">
              <CardImg top width="100%" src="images/demo.jpg" />
              <CardBody
                onMouseEnter={ e => {
                  const img = e.currentTarget.parentElement.querySelector('img')
                  if (img != null) img.style.maxHeight = '0px'
                }}
                onMouseLeave={ e => {
                  const img = e.currentTarget.parentElement.querySelector('img')
                  if (img != null) img.style.maxHeight = '1000px'
                }}
              >
                <TweenOne
                  style={{opacity: 0, transform: 'translateX(-50px)'}}
                  animation={{opacity: 1, x: 0, duration: 1000, ease: 'easeOutQuart', delay: 500}}
                >
                  <CardTitle>{`Project ${i+1}`}</CardTitle>
                  <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</CardText>
                </TweenOne>
              </CardBody>
            </Card>
          ))
          }
          </QueueAnim>
        </ScrollOverPack>
        <ScrollOverPack id="contact-page" className="contact-page" playScale={0.1}>
          <QueueAnim type="left" key='0' duration={1000} interval={200} leaveReverse={true}>
            <div key='0' className="section-title" style={{color: '#fff'}}>THANKS</div>
            <div key='1' className="underline" style={{borderTopColor: '#fff'}} />
          </QueueAnim>
        </ScrollOverPack>
      </div>
    );
  }
}

export default App;
