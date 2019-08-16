import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import NumberCard from './NumberCard'
import { TiPencil, TiDocumentText } from 'react-icons/ti'
import { FaGithub, FaAt, FaWikipediaW } from 'react-icons/fa'
import { Tooltip } from 'reactstrap'
import { isMobile } from 'react-device-detect'
import { Link, withRouter } from 'react-router-dom'
import Logo from './Logo'
import SimpleTooltip from './SimpleTooltip'
import places from '../data/places.yml'

const ScrollOverPack = ScrollAnim.OverPack

class About extends Component {
  state = {
    tooltipOpen: {
      email: false,
      github: false,
      googleScholar: false,
      wikipedia: false,
      zhihu: false,
      blog: false,
      resume: false
    },
    placement: 'right',
    logoLoaded: false,
    logoRotation: 0
  }

  tooltipToggle = link => {
    let tooltipOpen = this.state.tooltipOpen
    tooltipOpen[link] = !tooltipOpen[link]
    this.setState({ tooltipOpen })
  }

  updateTooltipPlacement = () => {
    this.setState({ placement: window.innerWidth > 964 ? 'right' : 'bottom' })
  }

  handleScroll = e => {
    const logo = document.querySelector('.logo')
    if (logo == null) return

    const scrollTop =
      document.documentElement.scrollTop || document.scrollingElement.scrollTop
    const offset = document.querySelector('.about-page').offsetTop - scrollTop
    if (!isMobile) logo.style.transform = `rotate(${offset}deg)`
    if (!isMobile && !this.state.logoLoaded) {
      const opacity = Math.min(1 - offset / window.innerHeight, 1)
      logo.style.opacity = opacity
      if (opacity === 1) this.setState({ logoLoaded: true })
    }
  }

  rotateLogo = () => {
    const logo = document.querySelector('.logo-mobile')
    if (logo == null) return
    logo.style.transition = 'transform ease 2s'
    logo.style.transform = `rotate(${this.state.logoRotation + 180}deg)`
    this.setState({ logoRotation: this.state.logoRotation + 180 })
  }

  componentDidMount() {
    this.updateTooltipPlacement()
    window.addEventListener('resize', this.updateTooltipPlacement)
    window.addEventListener('scroll', this.handleScroll)
    if (isMobile && document.querySelector('.logo-mobile') != null)
      document
        .querySelector('.logo-mobile')
        .addEventListener('touchstart', this.rotateLogo)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTooltipPlacement)
    window.removeEventListener('scroll', this.handleScroll)
    if (isMobile && document.querySelector('.logo-mobile') != null)
      document
        .querySelector('.logo-mobile')
        .removeEventListener('touchstart', this.rotateLogo)
  }

  render() {
    const iconSize = 30
    return (
      <ScrollOverPack
        id="about-page"
        className="about-page"
        playScale={0.5}
        always={false}
      >
        <Texty
          key="0"
          className="section-title noselect"
          delay={this.props.delay}
        >
          ABOUT
        </Texty>
        <TweenOne
          key="1"
          className="underline"
          animation={{
            opacity: 1,
            translateX: 0,
            delay: this.props.delay + 100,
            duration: 1000
          }}
        />
        {/* no rotation on mobile devices due to performance issue */}
        {!isMobile ? (
          <div className="logo noselect">
            <Logo radius={40} colors={['#0d8aba', '#222']} />
          </div>
        ) : (
          <TweenOne
            key="2"
            className="logo noselect logo-mobile"
            animation={{
              opacity: 0,
              scale: 0,
              type: 'from',
              delay: this.props.delay + 200,
              duration: 1000,
              ease: 'easeOutBack'
            }}
          >
            <Logo radius={40} colors={['#0d8aba', '#222']} />
          </TweenOne>
        )}
        <div className="about-wrap">
          <div className="about-text">
            <TweenOne
              animation={{
                opacity: 1,
                translateX: 0,
                delay: this.props.delay + 500,
                duration: 1000
              }}
            >
              <div className="about-text-paragraph">
                Hello! My name is Yi Liu, but I also go by Steven. Originally
                from Shanghai, China, I'm a Ph.D. student in{' '}
                <span className="strong">
                  Aerospace and Mechanical Engineering
                </span>{' '}
                at the <span className="strong">University of Notre Dame</span>,
                where I have been studying fluid dynamics problems using high
                performance computing (HPC)-based high-fidelity numerical
                simulations.
              </div>
            </TweenOne>
            <TweenOne
              animation={{
                opacity: 1,
                translateX: 0,
                delay: this.props.delay + 600,
                duration: 1000,
                ease: 'easeOutBack'
              }}
            >
              <div className="about-text-paragraph">
                In addition to my research, I am very passionate about{' '}
                <span className="strong">computer programming</span> in general.
                Acutally I have been obsessed with it since age of 10 when I
                wrote my first program in{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Logo_(programming_language)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Logo
                </a>
                .
              </div>
            </TweenOne>
            <TweenOne
              animation={{
                opacity: 1,
                translateX: 0,
                delay: this.props.delay + 700,
                duration: 1000,
                ease: 'easeOutBack'
              }}
            >
              <div className="about-text-paragraph">
                When out of the office, I really enjoy{' '}
                <span className="strong">writting Wikipedia articles</span>. I
                have been an active editor on Wikipedia (and Wikidata) since
                2010. If you're interested,{' '}
                <a
                  href="http://sh.eastday.com/m/20130712/u1a7515530.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>{' '}
                is an article about my Wikipedia experience (in Chinese)
                published several years ago in my hometown daily newspaper{' '}
                <i>
                  <a
                    href="https://en.wikipedia.org/wiki/Wenhui_Bao"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wenhui Bao
                  </a>
                </i>
                . Besides, in my spare time I also enjoy{' '}
                <Link to={{ pathname: 'read', backId: 'about-page' }}>
                  <SimpleTooltip id="tt-read" text="visit my reading list">
                    reading
                  </SimpleTooltip>
                </Link>
                ,{' '}
                <Link to={{ pathname: 'portfolio', backId: 'about-page' }}>
                  <SimpleTooltip id="tt-draw" text="visit my portfolio">
                    drawing
                  </SimpleTooltip>
                </Link>
                ,{' '}
                <Link to={{ pathname: 'portfolio', backId: 'about-page' }}>
                  <SimpleTooltip id="tt-design" text="visit my portfolio">
                    designing
                  </SimpleTooltip>
                </Link>
                , stargazing,{' '}
                <Link to={{ pathname: 'photos', backId: 'about-page' }}>
                  <SimpleTooltip id="tt-photos" text="check out my photographs">
                    photographing
                  </SimpleTooltip>
                </Link>
                , playing contract bridge,{' '}
                <Link to={{ pathname: 'places', backId: 'about-page' }}>
                  <SimpleTooltip
                    id="tt-places"
                    text="see the places I've been to"
                  >
                    travelling
                  </SimpleTooltip>
                </Link>
                , playing Pokémon games and a little bit of wine tasting.
              </div>
            </TweenOne>
          </div>
          <TweenOne
            className="about-links"
            animation={{
              opacity: 1,
              translateY: 0,
              delay: this.props.delay + 500,
              duration: 1000
            }}
          >
            <div
              id="email-icon"
              className="about-link"
              onClick={() => window.open('mailto:me@yliu.io', '_self')}
            >
              <FaAt
                size={iconSize}
                color={'#555'}
                className="about-link-main"
              />
              <FaAt
                size={iconSize}
                color={'#555'}
                className="about-link-secondary"
              />
            </div>
            <div
              id="github-icon"
              className="about-link"
              onClick={() =>
                window.open('https://github.com/stevenliuyi', '_blank')
              }
            >
              <FaGithub
                size={iconSize}
                color={'#555'}
                className="about-link-main"
              />
              <FaGithub
                size={iconSize}
                color={'#555'}
                className="about-link-secondary"
              />
            </div>
            <div
              id="blog-icon"
              className="about-link"
              onClick={() => window.open('https://blog.yliu.io')}
            >
              <span className="circle-icon about-link-main">
                <TiPencil size={iconSize * 0.8} />
              </span>
              <span className="circle-icon about-link-secondary">
                <TiPencil size={iconSize * 0.8} />
              </span>
            </div>
            <div
              id="zhihu-icon"
              className="about-link"
              onClick={() =>
                window.open('https://www.zhihu.com/people/stevenliuyi')
              }
            >
              <span className="circle-icon about-link-main">
                <i
                  className="iconfont icon-zhihu"
                  style={{ fontSize: iconSize * 0.7 }}
                />
              </span>
              <span className="circle-icon about-link-secondary">
                <i
                  className="iconfont icon-zhihu"
                  style={{ fontSize: iconSize * 0.7 }}
                />
              </span>
            </div>
            <div
              id="wikipedia-icon"
              className="about-link"
              onClick={() =>
                window.open('https://zh.wikipedia.org/wiki/User:Stevenliuyi')
              }
            >
              <span className="circle-icon about-link-main">
                <FaWikipediaW size={iconSize * 0.7} />
              </span>
              <span className="circle-icon about-link-secondary">
                <FaWikipediaW size={iconSize * 0.7} />
              </span>
            </div>
            <div
              id="googleScholar-icon"
              className="about-link"
              onClick={() =>
                window.open(
                  'https://scholar.google.com/citations?hl=en&user=4Bu3RO0AAAAJ',
                  '_blank'
                )
              }
            >
              <i
                className="iconfont icon-gscholar about-link-main"
                style={{ fontSize: iconSize, color: '#555' }}
              />
              <i
                className="iconfont icon-gscholar about-link-secondary"
                style={{ fontSize: iconSize, color: '#555' }}
              />
            </div>
            <div
              id="resume-icon"
              className="about-link"
              onClick={() =>
                this.props.history.push({
                  pathname: '/resume',
                  backId: 'about-page'
                })
              }
            >
              <span
                className="circle-icon about-link-main"
                style={{ backgroundColor: '#0d8aba' }}
              >
                <TiDocumentText size={iconSize * 0.7} />
              </span>
              <span
                className="circle-icon about-link-secondary"
                style={{ backgroundColor: '#0d8aba' }}
              >
                <TiDocumentText size={iconSize * 0.7} />
              </span>
            </div>
            <Tooltip
              placement={this.state.placement}
              target="email-icon"
              isOpen={this.state.tooltipOpen.email}
              toggle={() => this.tooltipToggle('email')}
              delay={100}
            >
              Email me at me@yliu.io
            </Tooltip>
            <Tooltip
              placement={this.state.placement}
              target="github-icon"
              isOpen={this.state.tooltipOpen.github}
              toggle={() => this.tooltipToggle('github')}
              delay={100}
            >
              Github
            </Tooltip>
            <Tooltip
              placement={this.state.placement}
              target="googleScholar-icon"
              isOpen={this.state.tooltipOpen.googleScholar}
              toggle={() => this.tooltipToggle('googleScholar')}
              delay={100}
            >
              Google Scholar
            </Tooltip>
            <Tooltip
              placement={this.state.placement}
              target="wikipedia-icon"
              isOpen={this.state.tooltipOpen.wikipedia}
              toggle={() => this.tooltipToggle('wikipedia')}
              delay={100}
            >
              Wikipedia
            </Tooltip>
            <Tooltip
              placement={this.state.placement}
              target="zhihu-icon"
              isOpen={this.state.tooltipOpen.zhihu}
              toggle={() => this.tooltipToggle('zhihu')}
              delay={100}
            >
              Zhihu
            </Tooltip>
            <Tooltip
              placement={this.state.placement}
              target="blog-icon"
              isOpen={this.state.tooltipOpen.blog}
              toggle={() => this.tooltipToggle('blog')}
              delay={100}
            >
              Blog
            </Tooltip>
            <Tooltip
              placement={this.state.placement}
              target="resume-icon"
              isOpen={this.state.tooltipOpen.resume}
              toggle={() => this.tooltipToggle('resume')}
              delay={100}
            >
              Résumé
            </Tooltip>
          </TweenOne>
        </div>
        <TweenOne
          className="number-cards-title"
          animation={{
            translateY: 100,
            opacity: 0,
            type: 'from',
            duration: 1000,
            delay: this.props.delay + 1000
          }}
        >
          <div
            className="number-cards-title-line"
            style={{ marginRight: 20 }}
          />
          <div>just some fun numbers</div>
          <div className="number-cards-title-line" style={{ marginLeft: 20 }} />
        </TweenOne>
        <TweenOne
          key="3"
          className="number-cards"
          animation={{
            opacity: 1,
            translateY: 0,
            duration: 1000,
            delay: this.props.delay + 1000
          }}
        >
          <NumberCard
            description="number of Wikipedia articles I created"
            number="20,000"
            detail="After 9 years as a volunteer of the Wikimedia movement, I've now made 1.5 million edits accoss Wikimedia projects."
          />
          <NumberCard
            description="my Erdős number"
            number="6"
            detail={
              <span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Erdős_number"
                >
                  Erdős number
                </a>{' '}
                is one's collabration distance to mathematican Paul Erdös.
              </span>
            }
          />
          <NumberCard
            description="number of U.S. states I've set foot on"
            number={places.USA.places.length - 1}
            detail={
              <span>
                ... and Washington, D.C.! Check out{' '}
                <Link to={{ pathname: 'places', backId: 'about-page' }}>
                  my traveler map
                </Link>{' '}
                to see all the states I have visited.
              </span>
            }
          />
          <NumberCard
            description="my favorite number"
            number="42"
            detail={
              <span>
                Because it's{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_(42)"
                >
                  the Answer to the Ultimate Question of Life, the Universe, and
                  Everything
                </a>
                !
              </span>
            }
          />
        </TweenOne>
      </ScrollOverPack>
    )
  }
}

export default withRouter(About)
