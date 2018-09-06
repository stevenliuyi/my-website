import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import NumberCard from './NumberCard'
import { TiPencil } from 'react-icons/ti'
import { FaGoogle, FaGithub, FaAt, FaWikipediaW } from 'react-icons/fa'
import { Tooltip } from 'reactstrap'

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
    placement: 'right'
  }

  tooltipToggle = (link) => {
    let tooltipOpen = this.state.tooltipOpen
    tooltipOpen[link] = !tooltipOpen[link]
    this.setState({ tooltipOpen })
  }

  updateTooltipPlacement = () => {
    this.setState({ placement: window.innerWidth > 964 ? 'right': 'bottom' })
  }

  componentDidMount() {
    this.updateTooltipPlacement()
    window.addEventListener('resize', this.updateTooltipPlacement)
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.updateTooltipPlacement)
  }

  render() {
    const iconSize = 30
    return (
      <ScrollOverPack id="about-page" className="about-page" playScale={0.5} always={false}>
        <Texty key='0' className="section-title noselect" delay={this.props.delay}>ABOUT</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
        <TweenOne key='2' className="logo noselect" animation={{ opacity: 1, scale: 1 ,  duration:1000, ease: 'easeOutBack', delay: this.props.delay }}>
          <img src="/icons/android-chrome-192x192.png" height={100} width={100} alt="logo" />
        </TweenOne>
        <div className="about-wrap">
          <div className="about-text">
            <TweenOne key='0' animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 1000, duration: 1000, ease:'easeOutBack'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum est id diam ullamcorper cursus. Aenean pharetra dolor eget lorem scelerisque, quis blandit justo finibus. Aliquam a pulvinar nisl. Proin blandit velit sed ipsum pellentesque, ut feugiat enim volutpat. Curabitur turpis lectus, aliquet vitae ante a, facilisis consequat quam. 
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
            <Tooltip placement={this.state.placement} target="blog-icon" isOpen={this.state.tooltipOpen.blog} toggle={() => this.tooltipToggle('blog')} delay={100}>Blog (in Mandarin)</Tooltip>
          </TweenOne>
        </div>
        <TweenOne key='3' className="number-cards" animation={{ opacity: 1, translateY: 0, duration: 1000, delay: this.props.delay + 2000 }}>
          <NumberCard description="number of Wikipedia articles I created" number="20,000" detail="These articles have been viewed 15 million times since 2015." />
          <NumberCard description="my Erdős number" number="6" detail={<div><a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Erdős_number">Erdős number</a> is one's collabration distance to mathematican Paul Erdös.</div>} />
          <NumberCard description="number of U.S. states I've set foot on" number="23" detail="... and Washington, D.C.!" />
          <NumberCard description="my favorite number" number="42" detail={<div>Because it's <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_(42)">the Answer to the Ultimate  Question of Life, the Universe, and Everything</a>!</div>}/>
        </TweenOne>
      </ScrollOverPack>
    );
  }
}

export default About;
