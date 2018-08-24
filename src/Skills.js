import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import * as d3 from 'd3'

// 0 - Novice
// 0.25 - Advanced Beginner
// 0.5 - Intermediate
// 0.75 - Proficient
// 1.0 - Expert
const data = {
  'Languages': [
    { skill: 'Python', value: 0.75, logo: 'python.svg' },
    { skill: 'C/C++', value: 0.5, logo: 'c++.png' },
    { skill: 'R', value: 0.65, logo: 'r.svg' },
    { skill: 'Fortran', value: 0.8 },
    { skill: 'MATLAB', value: 0.65, logo: 'matlab.png' },
    { skill: 'Java', value: 0.25, logo: 'java.svg' },
    { skill: 'JS (ES6)', value: 0.75, logo: 'javascript.png' },
    { skill: 'Perl', value: 0.25, logo: 'perl.png' },
    { skill: 'Swift', value: 0.3, logo: 'swift.svg' },
    { skill: 'Wolfram', value: 0.75, logo: 'wolfram.png' }
  ],
  'Web Development': [
    { skill: 'CSS', value: 0.65 },
    { skill: 'HTML5', value: 0.4 },
    { skill: 'React', value: 0.65, logo: 'react.svg' },
    { skill: 'JS (ES6)', value: 0.75, logo: 'javascript.png' },
    { skill: 'Node.js', value: 0.25 },
    { skill: 'Jinja2', value: 0.3 },
    { skill: 'jQuery', value: 0.5, logo: 'jquery.svg' },
    { skill: 'd3.js', value: 0.5, logo: 'd3.svg' },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 },
  ],
  'Databases': [
    { skill: 'MySQL', value: 0.5 },
    { skill: 'MongoDB', value: 0.3, logo: 'mongodb.png' },
    { skill: 'SQLite', value: 0.5 },
    { skill: 'placeholder4', value: 0 },
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
    { skill: 'Google Cloud', value: 0.4 },
    { skill: 'Travis CI', value: 0.65 },
    { skill: 'Heroku', value: 0.5 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Data Mining': [
    { skill: 'R', value: 0.65, logo: 'r.svg' },
    { skill: 'scikit-learn', value: 0.5 },
    { skill: 'Tensorflow', value: 0.5, logo: 'tensorflow.svg' },
    { skill: 'Pytorch', value: 0.3 },
    { skill: 'placeholder5', value: 0 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Parallel Programming': [
    { skill: 'MPI', value: 0.75 },
    { skill: 'OpenMP', value: 0.5 },
    { skill: 'OpenCL', value: 0.5 },
    { skill: 'HTCondor', value: 0.75 },
    { skill: 'placeholder5', value: 0 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Math/Engineering Softwares': [
    { skill: 'MATLAB', value: 0.65 },
    { skill: 'Mathematica', value: 0.75 },
    { skill: 'Maple', value: 0.35 },
    { skill: 'Fluent', value: 0.65 },
    { skill: 'STAR-CCM+', value: 0.5 },
    { skill: 'AutoCAD', value: 0.5 },
    { skill: 'CATIA', value: 0.6 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Markup Languages': [
    { skill: 'HTML', value: 0.75 },
    { skill: 'LaTeX', value: 0.8 },
    { skill: 'XML', value: 0.5 },
    { skill: 'JSON', value: 0.6 },
    { skill: 'YAML', value: 0.4 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Design': [
    { skill: 'Photoshop', value: 0.8 },
    { skill: 'Illustrator', value: 0.4 },
    { skill: 'InDesign', value: 0.25 },
    { skill: 'After Effects', value: 0.25 },
    { skill: '3DMax', value: 0.25 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 },
    { skill: 'placeholder10', value: 0 }
  ],
  'Miscellaneous': [
    { skill: 'Vim', value: 0.65 },
    { skill: 'MediaWiki', value: 0.6 },
    { skill: 'VBA', value: 0.6 },
    { skill: 'Doxygen', value: 0.5 },
    { skill: 'Jupyter', value: 0.75 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder10', value: 0 },
    { skill: 'placeholder9', value: 0 }
  ]
}

const updateD3Node = (data, width, height, delay=0) => { 

  const marginV = 10
  const marginH = 50
  const interval = 100

  width -= 2 * marginH
  height -= 2 * marginV

  let svg = d3.select('#skill-chart')
  svg.selectAll('*')
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .remove()

  svg = svg
    .append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', `translate(${marginH}, ${marginV})`)

  const x = d3.scaleLinear()
    .range([0, width-100])
    .domain([0, 1])

  const y = d3.scaleBand()
    .range([0, height])
    .domain(data.map(d => d.skill))
    .paddingInner(0.2)

  let bars = svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('g')

  bars.append('rect')
    .attr('class', 'skill-name-background')
    .attr('y', d => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', 0)
    .attr('width', 0)
    .on("mouseenter", handleMouseEnter)
    .transition()
    .duration(interval)
    .delay((d, i) => delay + 500 + interval*i)
    .attr('width', d => (d.value > 0 ? 100 : 0))

  bars.append('rect')
    .attr('class', 'skill-bar')
    .attr('y', d => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', 100)
    .attr('width', 0)
    .on("mouseenter", handleMouseEnter)
    .transition()
    .duration(interval*5)
    .delay((d, i) => delay + 500 + interval*(1+i))
    .attr('width', d => x(d.value))

  bars.append('rect')
    .attr('class', 'skill-bar-empty')
    .attr('y', d => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', d => 100 + x(d.value))
    .attr('width', 0)
    .on("mouseenter", handleMouseEnter)
    .transition()
    .duration(interval*5)
    .delay((d, i) => delay + 500 + interval*(6+i))
    .attr('width', d => (!d.skill.startsWith('placeholder') ? width-100-x(d.value) : 0))

  bars.append('text')
    .attr('class', 'skill-name')
    .attr('y', d => y(d.skill) + y.bandwidth() / 2)
    .attr('x', d => 50)
    .text(d => (!d.skill.startsWith('placeholder') ? d.skill : ''))
    .style('opacity', 0)
    .transition()
    .duration(interval*2)
    .delay((d, i) => delay + 500 + interval*i)
    .style('opacity', 1)

  function handleMouseEnter(d, i) {
    let img = d3.select('.skill-logo > img')
    img
      .transition()
      .style('transform', 'scaleX(1)')
      .duration(500)
      .style('transform', 'scaleX(0)')
      .transition()
      .duration(500)
      .style('transform', 'scaleX(1)')
      .attr('src', d.logo != null ? `images/${d.logo}` : 'icons/safari-pinned-tab.svg')
  }
}

const ScrollOverPack = ScrollAnim.OverPack

class Skills extends Component {

  state = {
    paused: true,
    activeCategory: 'Languages',
  }

  render() {
    const width = Math.max(window.innerWidth*.8 - 450, 300)

    return (
      <div style={{position: 'relative'}} id="skill-page" className="skill-page">
        <div className="skill-chart-wrap">
          <div className="skill-categories">
            {
              Object.keys(data).map( (category, i) => (
                <div>
                  <TweenOne paused={this.state.paused} style={{opacity: 0, transform: 'translateY(100px)'}} animation={{opacity:1, translateY: 0, delay: this.props.delay + 500 + i*100}}
                    onClick={() => {
                      updateD3Node(data[category], width, 400, this.props.delay)
                      this.setState({ activeCategory: category })
                    }}>
                    <div className={`skill-category ${this.state.activeCategory === category ? 'skill-category-active': ''}`}>
                      <span className="skill-category-bracket">{'<'}</span>
                      { category }
                      <span className="skill-category-bracket">{'/>'}</span>
                    </div>
                    { i !== Object.keys(data).length - 1 &&
                      <div className="skill-category-line" /> 
                    }
                  </TweenOne>
                </div>
              ))
            }          
          </div> 
          <TweenOne paused={this.state.paused} className="skill-logo" animation={{ opacity:1, rotateY: 0, delay: this.props.delay + 500, duration: 1000 }}>
            <img src="icons/safari-pinned-tab.svg" width={60} height={60} alt="skill logo" />
          </TweenOne>
          <div><svg id="skill-chart" width={width} height={400} /></div>
        </div>
        <ScrollOverPack id="skill-page" playScale={0.5} always={false}
         onChange={({mode, id}) => { if (mode === 'enter') {
           updateD3Node(data.Languages, width, 400, this.props.delay)
           this.setState({ paused: false })
         }}}>
          <Texty key='0' type="left" mode="smooth" className="section-title" delay={this.props.delay}>COMPUTER SKILLS</Texty>
          <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
        </ScrollOverPack>
      </div>
    );
  }
}

export default Skills;
