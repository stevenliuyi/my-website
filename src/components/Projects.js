import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import { TiChevronLeft, TiChevronRight } from 'react-icons/ti'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProjectCard from './ProjectCard'

const ScrollOverPack = ScrollAnim.OverPack

const projects = [
  {
    title: 'Admix',
    desc: 'DNA admixture analysis tool',
    image: 'admix.jpg',
    tools: ['Python'],
    link: 'https://github.com/stevenliuyi/admix'
  },
  {
    title: 'Wikidata Visualization',
    desc: 'visualization tools for Wikidata SPARQL queries',
    image: 'dataviz.png',
    tools: ['React', 'SPARQL', 'D3.js'],
    link: 'https://tools.wmflabs.org/dataviz'
  },
  {
    title: 'xkcd in Chinese',
    desc: 'Chinese translations of xkcd comics',
    image: 'xkcd-cn.png',
    tools: ['Python', 'Jinja2'],
    link: 'https://app-xkcd-cn.appspot.com'
  },
  {
    title: 'Yun',
    desc: 'iOS app for historical Chinese phonology',
    image: 'yun.png',
    tools: ['Swift']
  },
  {
    title: 'RHS for Google Search',
    desc:
      'Chrome extension that integrates contents into Google search results',
    image: 'google-rhs.jpg',
    tools: ['JavaScript'],
    link:
      'https://chrome.google.com/webstore/detail/right-hand-side-for-googl/fmdnfbdnbcglagflegehgacalfmgejhe'
  },
  {
    title: 'LCS',
    desc: 'C++ library for Lagrangian coherent structure analysis',
    image: 'lcs.png',
    tools: ['C++', 'OpenMP'],
    link: 'https://stevenliuyi.github.io/lcs'
  }
]

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adapativeHeight: true,
  swipe: true,
  nextArrow: <TiChevronRight size={32} color={'#222'} />,
  prevArrow: <TiChevronLeft size={32} color={'#222'} />
}

class Projects extends Component {
  state = {
    cardExpanded: false,
    projectsLoaded: false
  }

  expandCard = e => {
    // if (!this.state.projectsLoaded) return
    const img = e.currentTarget.parentElement.querySelector('img')
    if (img != null) img.style.maxHeight = '0px'
    this.setState({ cardExpanded: true })
  }

  collapseCard = e => {
    // if (!this.state.projectsLoaded) return
    const img = e.currentTarget.parentElement.querySelector('img')
    if (img != null) img.style.maxHeight = '200px'
    this.setState({ cardExpanded: false })
  }

  render() {
    const projectCards = projects.map((project, idx) => (
      <ProjectCard
        key={idx}
        expandCard={this.expandCard}
        collapseCard={this.collapseCard}
        {...project}
        {...this.state}
      />
    ))

    return (
      <ScrollOverPack
        id="project-page"
        className="project-page"
        playScale={0.5}
        always={false}
      >
        <Texty className="section-title noselect" delay={this.props.delay}>
          PROJECTS
        </Texty>
        <TweenOne
          className="underline"
          animation={{
            opacity: 1,
            translateX: 0,
            delay: this.props.delay + 100,
            duration: 1000
          }}
        />
        {window.innerWidth > 645 ? (
          <TweenOne
            className="projects"
            animation={{
              opacity: 1,
              translateY: 0,
              delay: this.props.delay + 300,
              duration: 1500,
              onComplete: e => {
                this.setState({ projectsLoaded: true })
              }
            }}
          >
            {projectCards}
          </TweenOne>
        ) : (
          <TweenOne
            className="projects-slider-wrap"
            animation={{
              opacity: 1,
              translateY: 0,
              delay: this.props.delay + 300,
              duration: 1500,
              onComplete: e => {
                this.setState({ projectsLoaded: true })
              }
            }}
          >
            <Slider className="projects-slider" {...sliderSettings}>
              {projectCards}
            </Slider>
          </TweenOne>
        )}
      </ScrollOverPack>
    )
  }
}

export default Projects
