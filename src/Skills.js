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
    { skill: 'Python', value: 0.75 },
    { skill: 'C/C++', value: 0.5 },
    { skill: 'R', value: 0.65 },
    { skill: 'Fortran', value: 0.8 },
    { skill: 'Matlab', value: 0.65 },
    { skill: 'Java', value: 0.3 },
    { skill: 'JS (ES6)', value: 0.75 },
    { skill: 'Perl', value: 0.25 },
    { skill: 'Swift', value: 0.25 }
  ],
  'Web Development': [
    { skill: 'CSS', value: 0.65 },
    { skill: 'HTML5', value: 0.4 },
    { skill: 'React', value: 0.65 },
    { skill: 'JS (ES6)', value: 0.75 },
    { skill: 'Node.js', value: 0.25 },
    { skill: 'Jinja2', value: 0.3 },
    { skill: 'jQuery', value: 0.5 },
    { skill: 'd3.js', value: 0.5 },
    { skill: 'placeholder9', value: 0 }
  ],
  'Databases': [
    { skill: 'MySQL', value: 0.5 },
    { skill: 'MongoDB', value: 0.3 },
    { skill: 'SQLite', value: 0.5 },
    { skill: 'placeholder4', value: 0 },
    { skill: 'placeholder5', value: 0 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 }
  ],
  'CI/CD': [
    { skill: 'Git', value: 0.75 },
    { skill: 'AWS', value: 0.4 },
    { skill: 'Google Cloud', value: 0.4 },
    { skill: 'Travis CI', value: 0.65 },
    { skill: 'Heroku', value: 0.5 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 }
  ],
  'Data Mining': [
    { skill: 'R', value: 0.65 },
    { skill: 'scikit-learn', value: 0.5 },
    { skill: 'Tensorflow', value: 0.5 },
    { skill: 'Pytorch', value: 0.3 },
    { skill: 'placeholder5', value: 0 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 }
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
    { skill: 'placeholder9', value: 0 }
  ],
  'Math/Engineering Softwares': [
    { skill: 'Matlab', value: 0.65 },
    { skill: 'Mathematica', value: 0.75 },
    { skill: 'Maple', value: 0.35 },
    { skill: 'Fluent', value: 0.65 },
    { skill: 'STAR-CCM+', value: 0.5 },
    { skill: 'AutoCAD', value: 0.5 },
    { skill: 'CATIA', value: 0.6 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 }
  ],
  'Markup Languages': [
    { skill: 'HTML', value: 0.75 },
    { skill: 'LaTeX', value: 0.75 },
    { skill: 'XML', value: 0.5 },
    { skill: 'JSON', value: 0.6 },
    { skill: 'YAML', value: 0.4 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 }
  ],
  'Design': [
    { skill: 'Photoshop', value: 0.75 },
    { skill: 'Illustrator', value: 0.4 },
    { skill: 'InDesign', value: 0.25 },
    { skill: 'After Effects', value: 0.25 },
    { skill: '3DMax', value: 0.25 },
    { skill: 'placeholder6', value: 0 },
    { skill: 'placeholder7', value: 0 },
    { skill: 'placeholder8', value: 0 },
    { skill: 'placeholder9', value: 0 }
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
    { skill: 'placeholder9', value: 0 }
  ]
}

const updateD3Node = (data, width, height) => { 

  const margin = 10
  const interval = 100

  width -= 2 * margin
  height -= 2 * margin

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
    .attr('transform', `translate(${margin}, ${margin})`)

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
    .transition()
    .duration(interval)
    .delay((d, i) => 1000 + interval*i)
    .attr('width', d => (d.value > 0 ? 100 : 0))

  bars.append('rect')
    .attr('class', 'skill-bar')
    .attr('y', d => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', 100)
    .attr('width', 0)
    .transition()
    .duration(interval*5)
    .delay((d, i) => 1000 + interval*(1+i))
    .attr('width', d => x(d.value))

  bars.append('text')
    .attr('class', 'skill-name')
    .attr('y', d => y(d.skill) + y.bandwidth() / 2)
    .attr('x', d => 50)
    .text(d => (!d.skill.startsWith('placeholder') ? d.skill : ''))
    .style('opacity', 0)
    .transition()
    .duration(interval*2)
    .delay((d, i) => 1000 + interval*i)
    .style('opacity', 1)
}

const ScrollOverPack = ScrollAnim.OverPack

class Skills extends Component {

  state = {
    paused: true,
    activeCategory: 'Languages'
  }

  render() {
    return (
      <div style={{position: 'relative'}} id="skill-page" className="skill-page">
        <div className="skill-chart-wrap">

        <div className="skill-categories">
            {
              Object.keys(data).map( (category, i) => (
                <TweenOne className={`skill-category ${this.state.activeCategory === category ? 'skill-category-active': ''}`} paused={this.state.paused} style={{opacity: 0, transform: 'translateY(100px)'}} animation={{opacity:1, translateY: 0, delay: 1000 + i*100}}
                  onClick={() => {
                    updateD3Node(data[category], 500, 300)
                    this.setState({ activeCategory: category })
                  }}>
                  { category }
                </TweenOne>
              ))
            }          
          </div>
          <svg id="skill-chart" width={500} height={300} />
        </div>
        <ScrollOverPack id="skill-page" playScale={0.5} always={false}
         onChange={({mode, id}) => { if (mode === 'enter') {
           updateD3Node(data.Languages, 500, 300)
           this.setState({ paused: false })
         }}}>
          <Texty key='0' type="left" mode="smooth" className="section-title" delay={500}>COMPUTER SKILLS</Texty>
          <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: 750, duration: 1000}} />
        </ScrollOverPack>
      </div>
    );
  }
}

export default Skills;
