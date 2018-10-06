import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import * as d3 from 'd3'
import { isSafari, isIOS } from 'react-device-detect'

// 0 - Novice
// 0.25 - Advanced Beginner
// 0.5 - Intermediate
// 0.75 - Proficient
// 1.0 - Expert
const data = {
  Languages: [
    { skill: 'Python', value: 0.75, logo: 'python.svg' },
    { skill: 'C/C++', value: 0.5, logo: 'c++.png' },
    { skill: 'R', value: 0.65, logo: 'r.svg' },
    { skill: 'Fortran', value: 0.8, logo: 'fortran.svg' },
    { skill: 'MATLAB', value: 0.65, logo: 'matlab.png' },
    { skill: 'Java', value: 0.25, logo: 'java.svg' },
    { skill: 'JS (ES6)', value: 0.75, logo: 'javascript.png' },
    { skill: 'Perl', value: 0.25, logo: 'perl.png' },
    { skill: 'Swift', value: 0.3, logo: 'swift.svg' },
    { skill: 'Wolfram', value: 0.75, logo: 'wolfram.png' }
  ],
  'Web Development': [
    { skill: 'CSS', value: 0.65, logo: 'css3.png' },
    { skill: 'HTML5', value: 0.4, logo: 'html5.png' },
    { skill: 'React', value: 0.65, logo: 'react.svg' },
    { skill: 'JS (ES6)', value: 0.75, logo: 'javascript.png' },
    { skill: 'Node.js', value: 0.25, logo: 'nodejs.svg' },
    { skill: 'Jinja2', value: 0.3, logo: 'jinja.png' },
    { skill: 'jQuery', value: 0.5, logo: 'jquery.svg' },
    { skill: 'd3.js', value: 0.5, logo: 'd3.svg' },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  Databases: [
    { skill: 'MySQL', value: 0.5, logo: 'mysql.png' },
    { skill: 'MongoDB', value: 0.3, logo: 'mongodb.png' },
    { skill: 'SQLite', value: 0.5, logo: 'sqlite.svg' },
    { skill: 'SPARQL', value: 0.8, logo: 'sparql.svg' },
    { skill: 'placeholder5', value: 0 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'CI/CD': [
    { skill: 'Git', value: 0.75, logo: 'git.svg' },
    { skill: 'AWS', value: 0.4, logo: 'aws.svg' },
    { skill: 'Google Cloud', value: 0.4, logo: 'gcloud.svg' },
    { skill: 'Travis CI', value: 0.65, logo: 'travis.svg' },
    { skill: 'Heroku', value: 0.5, logo: 'heroku.png' },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Data Mining': [
    { skill: 'R', value: 0.65, logo: 'r.svg' },
    { skill: 'scikit-learn', value: 0.5, logo: 'scikit.png' },
    { skill: 'Tensorflow', value: 0.5, logo: 'tensorflow.svg' },
    { skill: 'Pytorch', value: 0.3, logo: 'pytorch.svg' },
    { skill: 'placeholder5', value: 0 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Parallel Programming': [
    { skill: 'MPI', value: 0.75, logo: 'mpi.png' },
    { skill: 'OpenMP', value: 0.5, logo: 'openmp.png' },
    { skill: 'OpenCL', value: 0.5, logo: 'opencl.png' },
    { skill: 'HTCondor', value: 0.75, logo: 'htcondor.png' },
    { skill: 'placeholder5', value: 0 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Math/Engineering Softwares': [
    { skill: 'MATLAB', value: 0.65, logo: 'matlab.png' },
    { skill: 'Mathematica', value: 0.75, logo: 'mathematica.png' },
    { skill: 'Maple', value: 0.35, logo: 'maple.png' },
    { skill: 'Fluent', value: 0.65, logo: 'fluent.png' },
    { skill: 'STAR-CCM+', value: 0.5, logo: 'starccm.png' },
    { skill: 'AutoCAD', value: 0.5, logo: 'autocad.png' },
    { skill: 'CATIA', value: 0.6, logo: 'catia.svg' },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Markup Languages': [
    { skill: 'HTML', value: 0.75, logo: 'html5.png' },
    { skill: 'LaTeX', value: 0.8, logo: 'latex.svg' },
    { skill: 'XML', value: 0.5 },
    { skill: 'JSON', value: 0.6, logo: 'json.svg' },
    { skill: 'YAML', value: 0.4, logo: 'yaml.png' },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  Design: [
    { skill: 'Photoshop', value: 0.8, logo: 'ps.png' },
    { skill: 'Illustrator', value: 0.4, logo: 'ai.png' },
    { skill: 'InDesign', value: 0.25, logo: 'id.png' },
    { skill: 'After Effects', value: 0.25, logo: 'ae.png' },
    { skill: '3ds Max', value: 0.25, logo: '3dsmax.png' },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  Miscellaneous: [
    { skill: 'Vim', value: 0.65, logo: 'vim.svg' },
    { skill: 'MediaWiki', value: 0.6, logo: 'mediawiki.svg' },
    { skill: 'VBA', value: 0.6, logo: 'vba.png' },
    { skill: 'Doxygen', value: 0.5 },
    { skill: 'Jupyter', value: 0.75, logo: 'jupyter.svg' },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder10', value: 0 },
    { skill: 'placeholder9', value: 0 }
  ]
}

const updateD3Node = (data, width, height, delay = 0) => {
  // dynamically changed gradient not working on Safari,
  // perheps related to https://bugs.webkit.org/show_bug.cgi?id=41952
  const showGradient = !(isIOS || isSafari)

  const marginV = 10
  const marginH = 50
  const interval = 100

  width -= 2 * marginH
  height -= 2 * marginV

  let svg = d3.select('#skill-chart')
  svg
    .selectAll('*')
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .remove()

  if (showGradient) {
    let defs = svg.append('defs')

    let grad = defs
      .append('linearGradient')
      .attr('id', 'bar-grad')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', width - 100)
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
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', width - 100)
      .attr('y2', 0)

    grad
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#55eef3')
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
    .domain(data.map(d => d.skill))
    .paddingInner(0.2)

  let bars = svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('g')

  bars
    .append('rect')
    .attr('class', 'skill-name-background')
    .attr('y', d => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', 0)
    .attr('width', 0)
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .transition()
    .duration(interval)
    .delay((d, i) => delay + 500 + interval * i)
    .attr('width', d => (d.value > 0 ? 100 : 0))

  bars
    .append('rect')
    .attr('class', 'skill-bar')
    .attr('id', (d, i) => `skill-bar${i}`)
    .attr('y', d => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', 100)
    .attr('width', 0)
    .attr('fill', showGradient ? 'url(#bar-grad)' : '#0d8aba')
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .transition()
    .duration(interval * 5)
    .delay((d, i) => delay + 500 + interval * (1 + i))
    .attr('width', d => x(d.value))

  bars
    .append('rect')
    .attr('class', 'skill-bar-empty')
    .attr('y', d => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', d => 100 + x(d.value))
    .attr('width', 0)
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .transition()
    .duration(interval * 5)
    .delay((d, i) => delay + 500 + interval * (6 + i))
    .attr(
      'width',
      d => (!d.skill.startsWith('placeholder') ? width - 100 - x(d.value) : 0)
    )

  bars
    .append('text')
    .attr('class', 'skill-name noselect')
    .attr('id', (d, i) => `skill-name${i}`)
    .attr('y', d => y(d.skill) + y.bandwidth() / 2)
    .attr('x', d => 50)
    .text(d => (!d.skill.startsWith('placeholder') ? d.skill : ''))
    .style('opacity', 0)
    .style('pointer', 'default')
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .transition()
    .duration(interval * 2)
    .delay((d, i) => delay + 500 + interval * i)
    .style('opacity', 1)

  function handleMouseEnter(d, i) {
    let img = d3.select('.skill-logo > img')
    img
      .transition()
      .style('transform', 'scaleX(1)')
      .duration(300)
      .style('transform', 'scaleX(0)')
      .transition()
      .duration(300)
      .attr(
        'src',
        d.logo != null ? `images/${d.logo}` : 'icons/safari-pinned-tab.svg'
      )
      .transition()
      .duration(300)
      .style('transform', 'scaleX(1)')

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
    width: 0
  }

  getWidth = () => Math.max(window.innerWidth * 0.8 - 450, 400)

  onResize = () => {
    // only update chart after the initial animation is performed
    if (this.state.paused) return

    // only update if width is changed
    const width = this.getWidth()
    if (width === this.state.width) return

    clearTimeout(window.resizedFinished)
    window.resizedFinished = setTimeout(() => {
      updateD3Node(data[this.state.activeCategory], width, 400)
      this.setState({ width })
    }, 250)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    this.setState({ width: this.getWidth() })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    return (
      <div
        style={{ position: 'relative' }}
        id="skill-page"
        className="skill-page"
      >
        <div className="skill-chart-wrap">
          <div className="skill-categories">
            {Object.keys(data).map((category, i) => (
              <div key={`skill-category-${i}`}>
                <TweenOne
                  paused={this.state.paused}
                  style={{ opacity: 0, transform: 'translateY(100px)' }}
                  animation={{
                    opacity: 1,
                    translateY: 0,
                    delay: this.props.delay + 500 + i * 100
                  }}
                  onClick={() => {
                    updateD3Node(
                      data[category],
                      this.state.width,
                      400,
                      this.props.delay
                    )
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
              delay: this.props.delay + 500,
              duration: 1000,
              ease: 'easeOutBack'
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
        <ScrollOverPack
          id="skill-page"
          playScale={0.5}
          always={false}
          onChange={({ mode, id }) => {
            if (mode === 'enter') {
              updateD3Node(
                data.Languages,
                this.state.width,
                400,
                this.props.delay
              )
              this.setState({ paused: false })
            }
          }}
        >
          <Texty
            key="0"
            className="section-title noselect"
            delay={this.props.delay}
          >
            COMPUTER SKILLS
          </Texty>
          <TweenOne
            key="1"
            className="underline"
            animation={{
              opacity: 1,
              translateX: 0,
              delay: this.props.delay + 250,
              duration: 1000
            }}
          />
        </ScrollOverPack>
      </div>
    )
  }
}

export default Skills
