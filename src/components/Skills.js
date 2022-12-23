import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import * as d3 from 'd3'
import { isSafari, isIOS } from 'react-device-detect'
import { GoOctoface } from 'react-icons/go'
import { FaLaptopCode } from 'react-icons/fa'
import GithubCard from './GithubCard'
import MoreButton from './MoreButton'
import data from '../data/skills.yml'
import languages from '../data/languages.yml'
import counts from '../data/counts.yml'

// combine entries with small values
const compactData = (data, n) => {
  if (n >= data.length) return data

  // clone object
  let newData = JSON.parse(JSON.stringify(data))
  // sort by values
  newData = newData.sort((a, b) => a.bytes - b.bytes)
  // calculate sum of small values
  let sum = newData
    .slice(0, data.length - n + 1)
    .map((d) => d.bytes)
    .reduce((sum, x) => sum + x)
  // exclude entries of small values and sort alphabetically
  newData = newData
    .slice(data.length - n + 1)
    .sort((a, b) => a.language.localeCompare(b.language))
  // add the sum as a single entry
  newData.push({ language: 'Others', bytes: sum })

  return newData
}

// update skill logo
const updateSkillLogo = (logo_src = 'icons/safari-pinned-tab.svg') => {
  let img = d3.select('.skill-logo > img')
  img
    .transition()
    .style('transform', 'scaleX(1)')
    .duration(300)
    .style('transform', 'scaleX(0)')
    .transition()
    .duration(300)
    .attr('src', logo_src)
    .transition()
    .duration(300)
    .style('transform', 'scaleX(1)')
}

const updateGithubD3Node = (width, height, delay = 0) => {
  // dynamically changed gradient not working on Safari,
  // perheps related to https://bugs.webkit.org/show_bug.cgi?id=41952
  const showGradient = !(isIOS || isSafari)

  const marginV = 0
  const marginH = 45
  const interval = 100
  const labelHeight = 40
  const minBandwidth = 30

  width -= 2 * marginH
  height -= 2 * marginV

  let svg = d3.select('#github-chart')
  svg.selectAll('*').transition().duration(1000).style('opacity', 0).remove()

  svg = svg
    .append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', `translate(${marginH}, ${marginV - labelHeight})`)

  if (showGradient) {
    let defs = svg.append('defs')

    let grad = defs
      .append('linearGradient')
      .attr('id', 'bar-grad')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', height - labelHeight)

    grad
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#0b78a2')
      .style('stop-opacity', 1)

    grad
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#10e3ea')
      .style('stop-opacity', 1)

    grad = defs
      .append('linearGradient')
      .attr('id', 'bar-grad-hover')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', height - labelHeight)

    grad
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#10aeeb')
      .style('stop-opacity', 1)

    grad
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#53eef3')
      .style('stop-opacity', 1)
  }

  const nBands = Math.min(
    Math.round((width + 0.2 * minBandwidth) / (1.2 * minBandwidth)),
    languages.length
  )
  const languagesData = compactData(languages, nBands)
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(languagesData.map((d) => d.language))
    .paddingInner(0.2)

  let yMin = d3.min(languagesData, (d) => d.bytes)
  let yMax = d3.max(languagesData, (d) => d.bytes)
  yMin = Math.pow(
    10,
    Math.max(Math.floor(Math.log(yMin) / Math.log(10)) - 1, 1)
  )

  const y = d3.scaleLog().range([labelHeight, height]).domain([yMax, yMin])

  // add x-axis
  let xAxis = svg
    .append('g')
    .attr('class', 'github-x-axis')
    .attr('transform', `translate(0, ${height - labelHeight})`)
    .call(d3.axisBottom(x))

  xAxis.select('.domain').remove()

  xAxis
    .selectAll('text')
    .attr('class', 'github-name noselect')
    .attr('id', (d, i) => `github-name${i}`)
    .attr('dx', '-.8em')
    .attr('dy', '.4em')
    .attr('transform', 'rotate(-45)')
    .style('opacity', 0)
    .transition()
    .duration(interval * 5)
    .delay(delay)
    .style('opacity', 1)

  // add y-axis
  const yMin_log = Math.log(yMin) / Math.log(10) + 1
  const yMax_log = Math.floor(Math.log(yMax) / Math.log(10))
  let yAxis = svg
    .append('g')
    .attr('class', 'gitub-y-axis')
    .call(
      d3
        .axisRight(y)
        .tickValues(
          d3.range(yMin_log, yMax_log + 1).map((d) => Math.pow(10, d))
        )
        .tickSize(width)
        .tickFormat((d) => `${d3.format('.0s')(d)}B`)
    )

  yAxis.select('.domain').remove()
  yAxis.selectAll('.tick line').attr('stroke', '#aaa')

  yAxis
    .selectAll('.tick text')
    .attr('class', 'github-byte noselect')
    .attr('x', -5)

  yAxis
    .selectAll('.tick line,.tick text')
    .style('opacity', 0)
    .transition()
    .duration(interval * 5)
    .delay(delay)
    .style('opacity', 1)

  // add bars
  let bars = svg.selectAll('.bar').data(languagesData).enter().append('g')

  bars
    .append('rect')
    .attr('class', 'github-bar')
    .attr('id', (d, i) => `github-bar${i}`)
    .attr('x', (d) => x(d.language))
    .attr('width', x.bandwidth())
    .attr('y', height - labelHeight)
    .attr('height', 0)
    .attr('fill', showGradient ? 'url(#bar-grad)' : '#0d8aba')
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .transition()
    .duration(interval * 5)
    .delay((d, i) => delay + interval * (1 + i))
    .attr('y', (d) => y(d.bytes))
    .attr('height', (d) => height - labelHeight - y(d.bytes))

  function handleMouseEnter(d, i) {
    d3.select(`#github-name${i}`).attr('font-weight', 'bold')
    d3.select(`#github-bar${i}`).attr(
      'fill',
      showGradient ? 'url(#bar-grad-hover)' : '#10adea'
    )
  }

  function handleMouseLeave(d, i) {
    d3.select(`#github-name${i}`).attr('font-weight', '300')
    d3.select(`#github-bar${i}`).attr(
      'fill',
      showGradient ? 'url(#bar-grad)' : '#0d8aba'
    )
  }
}

const updateSkillD3Node = (data, width, height, delay = 0) => {
  // dynamically changed gradient not working on Safari,
  // perheps related to https://bugs.webkit.org/show_bug.cgi?id=41952
  const showGradient = !(isIOS || isSafari)

  const marginV = 10
  const marginH = 50
  const interval = 100

  width -= 2 * marginH
  height -= 2 * marginV

  let svg = d3.select('#skill-chart')
  svg.selectAll('*').transition().duration(1000).style('opacity', 0).remove()

  if (showGradient) {
    let defs = svg.append('defs')

    let grad = defs
      .append('linearGradient')
      .attr('id', 'bar-grad')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 100)
      .attr('y1', 0)
      .attr('x2', 100 + (width - 100) * d3.max(data, (d) => d.value))
      .attr('y2', 0)

    grad
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#10e3ea')
      .style('stop-opacity', 1)

    grad
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#0b78a2')
      .style('stop-opacity', 1)

    grad = defs
      .append('linearGradient')
      .attr('id', 'bar-grad-hover')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 100)
      .attr('y1', 0)
      .attr('x2', 100 + (width - 100) * d3.max(data, (d) => d.value))
      .attr('y2', 0)

    grad
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#53eef3')
      .style('stop-opacity', 1)

    grad
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#10aeeb')
      .style('stop-opacity', 1)
  }

  svg = svg
    .append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', `translate(${marginH}, ${marginV})`)

  const x = d3
    .scaleLinear()
    .range([0, width - 100])
    .domain([0, 1])

  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(data.map((d) => d.skill))
    .paddingInner(0.2)

  let bars = svg.selectAll('.bar').data(data).enter().append('g')

  bars
    .append('rect')
    .attr('class', 'skill-name-background')
    .attr('y', (d) => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', 0)
    .attr('width', 0)
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .transition()
    .duration(interval)
    .delay((d, i) => delay + 250 + interval * i)
    .attr('width', (d) => (d.value > 0 ? 100 : 0))

  bars
    .append('rect')
    .attr('class', 'skill-bar')
    .attr('id', (d, i) => `skill-bar${i}`)
    .attr('y', (d) => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', 100)
    .attr('width', 0)
    .attr('fill', showGradient ? 'url(#bar-grad)' : '#0d8aba')
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .transition()
    .duration(interval * 5)
    .delay((d, i) => delay + 250 + interval * (1 + i))
    .attr('width', (d) => x(d.value))

  bars
    .append('rect')
    .attr('class', 'skill-bar-empty')
    .attr('y', (d) => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', (d) => 100 + x(d.value))
    .attr('width', 0)
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .transition()
    .duration(interval * 5)
    .delay((d, i) => delay + 250 + interval * (6 + i))
    .attr('width', (d) =>
      !d.skill.startsWith('placeholder') ? width - 100 - x(d.value) : 0
    )

  bars
    .append('text')
    .attr('class', 'skill-name noselect')
    .attr('id', (d, i) => `skill-name${i}`)
    .attr('y', (d) => y(d.skill) + y.bandwidth() / 2)
    .attr('x', (d) => 50)
    .text((d) => (!d.skill.startsWith('placeholder') ? d.skill : ''))
    .style('opacity', 0)
    .style('pointer', 'default')
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .transition()
    .duration(interval * 2)
    .delay((d, i) => delay + 250 + interval * i)
    .style('opacity', 1)

  function handleMouseEnter(d, i) {
    updateSkillLogo(
      d.logo != null ? `images/skills/${d.logo}` : 'icons/safari-pinned-tab.svg'
    )

    d3.select(`#skill-name${i}`).attr('font-weight', 'bold')
    d3.select(`#skill-bar${i}`).attr(
      'fill',
      showGradient ? 'url(#bar-grad-hover)' : '#10adea'
    )
  }

  function handleMouseLeave(d, i) {
    d3.select(`#skill-name${i}`).attr('font-weight', '300')
    d3.select(`#skill-bar${i}`).attr(
      'fill',
      showGradient ? 'url(#bar-grad)' : '#0d8aba'
    )
  }
}

const ScrollOverPack = ScrollAnim.OverPack

class Skills extends Component {
  state = {
    paused: true,
    activeCategory: 'Languages',
    width: 0,
    github: false,
    showSwitchButton: false,
  }

  getWidth = () =>
    !this.state.github
      ? Math.min(
          Math.max(window.innerWidth * 0.8 - 450, 400),
          window.innerWidth
        )
      : Math.min(
          Math.max(window.innerWidth * 0.8 - 450, 400),
          Math.round(45 * (languages.length * 1.2))
        )

  onResize = () => {
    // only update chart after the initial animation is performed
    if (this.state.paused) return

    // only update if width is changed
    const width = this.getWidth()
    if (width === this.state.width) return

    clearTimeout(window.resizedFinished)
    window.resizedFinished = setTimeout(() => {
      if (!this.state.github)
        updateSkillD3Node(data[this.state.activeCategory], width, 400)
      else updateGithubD3Node(width, 400)

      this.setState({ width })
    }, 250)
  }

  switchPage = () => {
    this.setState({ github: !this.state.github })
  }

  handleScroll = (e) => {
    const scrollTop =
      document.documentElement.scrollTop || document.scrollingElement.scrollTop
    const offset = document.querySelector('.skill-page').offsetTop - scrollTop
    this.setState({
      showSwitchButton: offset - 0.5 * window.innerHeight < 0 && offset > -200,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // switch button clicked
    if (this.state.github !== prevState.github) {
      if (!this.state.github) {
        updateSkillD3Node(
          data[this.state.activeCategory],
          this.state.width,
          400
        )
      } else {
        updateGithubD3Node(this.state.width, 400)
      }
    }

    // page scrolled into view
    if (this.state.showSwitchButton !== prevState.showSwitchButton) {
      const switchElement = document.querySelector('.skill-switch')
      if (switchElement == null) return
      if (this.state.showSwitchButton)
        switchElement.classList.remove('skill-switch-init')
      else switchElement.classList.add('skill-switch-init')
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.handleScroll)
    this.setState({ width: this.getWidth() })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <div
        style={{ position: 'relative' }}
        id="skill-page"
        className="skill-page"
      >
        <div
          className="skill-switch skill-switch-init"
          onClick={this.switchPage}
        >
          <div>
            {!this.state.github ? 'My Github Stats' : 'Computer Skills'}
          </div>
          {!this.state.github && <GoOctoface size={30} color={'#eee'} />}
          {this.state.github && <FaLaptopCode size={30} color={'#eee'} />}
        </div>
        {
          // Computer Skills
          !this.state.github && (
            <div className="skill-chart-wrap">
              <div className="section-text-wrap">
                <TweenOne
                  key="3"
                  paused={this.state.paused}
                  animation={{
                    opacity: 1,
                    translateX: 0,
                    delay: this.props.delay + 350,
                    duration: 1000,
                    ease: 'easeOutBack',
                  }}
                >
                  <div className="section-text">
                    I often find myself being addicted to learning new computer
                    skills; it's like discovering and exploring different new
                    worlds. As the “Father of the Internet” Vint Cerf once said,
                    “Programming computers was so fascinating. You create your
                    own little universe, and then it does what you tell it to
                    do.”
                  </div>
                </TweenOne>
              </div>
              <div className="skill-categories">
                {Object.keys(data).map((category, i) => (
                  <div key={`skill-category-${i}`}>
                    <TweenOne
                      paused={this.state.paused}
                      style={{ opacity: 0, transform: 'translateY(100px)' }}
                      animation={{
                        opacity: 1,
                        translateY: 0,
                        delay: this.props.delay + 250 + i * 100,
                      }}
                      onClick={() => {
                        updateSkillD3Node(
                          data[category],
                          this.state.width,
                          400,
                          this.props.delay
                        )
                        if (this.state.activeCategory !== category)
                          updateSkillLogo()
                        this.setState({ activeCategory: category })
                      }}
                    >
                      <div
                        className={`skill-category noselect ${
                          this.state.activeCategory === category
                            ? 'skill-category-active'
                            : ''
                        }`}
                      >
                        <span className="skill-category-bracket">{'<'}</span>
                        {category}
                        <span className="skill-category-bracket">{'/>'}</span>
                      </div>
                      {i !== Object.keys(data).length - 1 && (
                        <div className="skill-category-line" />
                      )}
                    </TweenOne>
                  </div>
                ))}
              </div>
              <TweenOne
                paused={this.state.paused}
                className="skill-logo noselect"
                animation={{
                  opacity: 1,
                  scale: 1,
                  delay: this.props.delay + 250,
                  duration: 1000,
                  ease: 'easeOutBack',
                }}
              >
                <img
                  src="icons/safari-pinned-tab.svg"
                  width={60}
                  height={60}
                  alt="skill logo"
                />
              </TweenOne>
              <div>
                <svg id="skill-chart" width={this.state.width} height={400} />
              </div>
            </div>
          )
        }

        {
          // Github statistics
          this.state.github && (
            <div className="skill-chart-wrap">
              <svg id="github-chart" width={this.state.width} height={400} />
              <div className="github-cards">
                <GithubCard
                  description={'Repositories'}
                  number={counts.github}
                />
                <GithubCard
                  description={'Languages'}
                  number={languages.length}
                />
                <GithubCard description={'Commits'} number={counts.commits} />
              </div>
            </div>
          )
        }
        <ScrollOverPack
          id="skill-page"
          playScale={0.5}
          always={false}
          onChange={({ mode, id }) => {
            if (!this.state.paused) return
            if (mode === 'enter') {
              if (!this.state.github)
                updateSkillD3Node(
                  data.Languages,
                  this.state.width,
                  400,
                  this.props.delay
                )
              this.setState({ paused: false })
            }
          }}
        >
          {!this.state.github && (
            <Texty
              key="0"
              className="section-title noselect"
              delay={this.props.delay}
            >
              COMPUTER SKILLS
            </Texty>
          )}
          {this.state.github && (
            <Texty
              key="1"
              className="section-title noselect"
              delay={this.props.delay}
            >
              GITHUB STATS
            </Texty>
          )}
          <TweenOne
            key="2"
            className="underline"
            animation={{
              opacity: 1,
              translateX: 0,
              delay: this.props.delay + 250,
              duration: 1000,
            }}
          />
          {this.state.github && (
            <a
              target="_blank"
              href="https://github.com/stevenliuyi"
              rel="noopener noreferrer"
            >
              <MoreButton title={'My Github'} delay={250} />
            </a>
          )}
        </ScrollOverPack>
      </div>
    )
  }
}

export default Skills
