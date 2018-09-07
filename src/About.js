import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import NumberCard from './NumberCard'
import { TiPencil } from 'react-icons/ti'
import { FaGoogle, FaGithub, FaAt, FaWikipediaW } from 'react-icons/fa'
import { Tooltip } from 'reactstrap'
import { isMobile } from 'react-device-detect'
import Logo from './Logo'

const ScrollOverPack = ScrollAnim.OverPack

class About extends Component {
  state = {
    tooltipOpen: {
      email: false,
      github: false,
      googleScholar: false,
      wikipedia: false,
      zhihu: false,
      blog: false
    },
    placement: 'right',
    logoLoaded: false
  }

  tooltipToggle = (link) => {
    let tooltipOpen = this.state.tooltipOpen
    tooltipOpen[link] = !tooltipOpen[link]
    this.setState({ tooltipOpen })
  }

  updateTooltipPlacement = () => {
    this.setState({ placement: window.innerWidth > 964 ? 'right': 'bottom' })
  }

  handleScroll = (e) => {
    const logo = document.querySelector('.logo')
    if (logo == null) return

    const scrollTop = document.documentElement.scrollTop || document.scrollingElement.scrollTop
    const offset = document.querySelector('.about-page').offsetTop - scrollTop
    if (!isMobile) logo.style.transform = `rotate(${offset}deg)`
    if (!this.state.logoLoaded) {
      const opacity = Math.min(1 - offset / window.innerHeight, 1)
      logo.style.opacity = opacity
      if (opacity === 1) this.setState({ logoLoaded: true })
    }
  }

  componentDidMount() {
    this.updateTooltipPlacement()
    window.addEventListener('resize', this.updateTooltipPlacement)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.updateTooltipPlacement)
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const iconSize = 30
    return (
      <ScrollOverPack id="about-page" className="about-page" playScale={0.5} always={false}>
        <Texty key='0' className="section-title noselect" delay={this.props.delay}>ABOUT</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
        {/* no rotation on mobile devices due to performance issue */}
        { !isMobile ?
          <div className="logo noselect">
            <Logo radius={40} colors={['#0d8aba', '#222']} />
          </div> :
          <TweenOne key='2' className="logo noselect" animation={{ opacity: 0, scale: 0, type: 'from', delay: this.props.delay + 750, duration: 1000}}>
            <Logo radius={40} colors={['#0d8aba', '#222']} />
          </TweenOne>
        }
        <div className="about-wrap">
          <div className="about-text">
            <TweenOne key='0' animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 1000, duration: 1000, ease:'easeOutBack'}}>
              Hello! My name is <span className="strong">Yi Liu</span>, but I also go by <span className="strong">Steven</span>. Originally from Shanghai, China, I'm a Ph.D. student in Aerospace and Mechanical Engineering at the University of Notre Dame. Aenean pharetra dolor eget lorem scelerisque, quis blandit justo finibus. Aliquam a pulvinar nisl. Proin blandit velit sed ipsum pellentesque, ut feugiat enim volutpat. Curabitur turpis lectus, aliquet vitae ante a, facilisis consequat quam. 
            </TweenOne>
            <TweenOne key='1' animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 1200, duration: 1000, ease:'easeOutBack'}}>
              Nulla a egestas nibh. Suspendisse hendrerit magna sed odio dignissim blandit. Morbi pharetra mi non ullamcorper semper. Vestibulum mattis, est eget condimentum blandit, est eros tristique diam, sit amet mattis tellus enim quis augue. Sed sed justo tempus, auctor neque et, placerat nulla. Ut euismod fringilla diam nec varius.
            </TweenOne>
            <TweenOne key='2' animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 1400, duration: 1000, ease:'easeOutBack'}}>
              Etiam non tortor diam. Aliquam et tempus velit. Nam interdum nunc nec tortor gravida egestas. Curabitur porttitor sodales ante ut ullamcorper.
            </TweenOne>
          </div>
          <TweenOne className="about-links" animation={{ opacity: 1, translateY: 0, delay: this.props.delay + 1200, duration: 1000}}>
            <div id="email-icon" className="about-link" onClick={() => window.open('mailto:me@yliu.io', '_self')}><FaAt size={iconSize} /></div>
            <div id="github-icon" className="about-link" onClick={() => window.open('https://github.com/stevenliuyi', '_blank')}><FaGithub size={iconSize} /></div>
            <div id="blog-icon" className="about-link" onClick={() => window.open('https://blog.yliu.io')}><span className='circle-icon'><TiPencil size={iconSize*.8} /></span></div>
            <div id="zhihu-icon" className="about-link" onClick={() => window.open('https://www.zhihu.com/people/stevenliuyi')}><span className='circle-icon'><i className="iconfont icon-zhihu" style={{ fontSize: iconSize*.7 }}></i></span></div>
            <div id="wikipedia-icon" className="about-link" onClick={() => window.open('https://zh.wikipedia.org/wiki/User:Stevenliuyi')}><span className='circle-icon'><FaWikipediaW size={iconSize*.7} /></span></div>
            <div id="googleScholar-icon" className="about-link" onClick={() => window.open('https://scholar.google.com/citations?hl=en&user=4Bu3RO0AAAAJ', '_blank')}><span className='circle-icon'><FaGoogle size={iconSize*.7} /></span></div>
            <Tooltip placement={this.state.placement} target="email-icon" isOpen={this.state.tooltipOpen.email} toggle={() => this.tooltipToggle('email')} delay={100}>Email me at me@yliu.io</Tooltip>
            <Tooltip placement={this.state.placement} target="github-icon" isOpen={this.state.tooltipOpen.github} toggle={() => this.tooltipToggle('github')} delay={100}>Github</Tooltip>
            <Tooltip placement={this.state.placement} target="googleScholar-icon" isOpen={this.state.tooltipOpen.googleScholar} toggle={() => this.tooltipToggle('googleScholar')} delay={100}>Google Scholar</Tooltip>
            <Tooltip placement={this.state.placement} target="wikipedia-icon" isOpen={this.state.tooltipOpen.wikipedia} toggle={() => this.tooltipToggle('wikipedia')} delay={100}>Wikipedia</Tooltip>
            <Tooltip placement={this.state.placement} target="zhihu-icon" isOpen={this.state.tooltipOpen.zhihu} toggle={() => this.tooltipToggle('zhihu')} delay={100}>Zhihu</Tooltip>
            <Tooltip placement={this.state.placement} target="blog-icon" isOpen={this.state.tooltipOpen.blog} toggle={() => this.tooltipToggle('blog')} delay={100}>Blog</Tooltip>
          </TweenOne>
        </div>
        <TweenOne key='3' className="number-cards" animation={{ opacity: 1, translateY: 0, duration: 1000, delay: this.props.delay + 2000 }}>
          <NumberCard description="number of Wikipedia articles I created" number="20,000" detail="These articles have been viewed 15 million times since 2015." />
          <NumberCard description="my Erdős number" number="6" detail={<span><a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Erdős_number">Erdős number</a> is one's collabration distance to mathematican Paul Erdös.</span>} />
          <NumberCard description="number of U.S. states I've set foot on" number="23" detail="... and Washington, D.C.!" />
          <NumberCard description="my favorite number" number="42" detail={<span>Because it's <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_(42)">the Answer to the Ultimate  Question of Life, the Universe, and Everything</a>!</span>}/>
        </TweenOne>
      </ScrollOverPack>
    );
  }
}

export default About;
