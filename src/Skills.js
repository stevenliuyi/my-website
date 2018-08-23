import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import * as d3 from 'd3'

const data = [
    { skill: 'CSS', value: 0.7 },
    { skill: 'HTML', value: 0.8  },
    { skill: 'React', value: 0.7 },
    { skill: 'Javascript', value: 0.8 },
    { skill: '', value: 0 },
    { skill: '', value: 0 },
    { skill: '', value: 0 },
    { skill: '', value: 0 },
  ]

const updateD3Node = () => { 
  const width = 500
  const height = 300
  let svg = d3.select('#skill-chart')
  svg = svg
    .append('g')
    .attr('width', width)
    .attr('height', height)

  const x = d3.scaleLinear()
    .range([0, width-100])
    .domain([0, 1])

  const y = d3.scaleBand()
    .range([0, height])
    .domain(data.map(d => d.skill))
    .paddingInner(0.1)

  let bars = svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('g')

  bars.append('rect')
    .attr('class', 'skill-bar')
    .attr('y', d => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', 100)
    .attr('width', 0)
    .transition()
    .duration(1000)
    .delay((d, i) => 1200 + i * 200)
    .attr('width', d => x(d.value))

  bars.append('rect')
    .attr('class', 'skill-name-background')
    .attr('y', d => y(d.skill))
    .attr('height', y.bandwidth())
    .attr('x', 0)
    .attr('width', 0)
    .transition()
    .duration(200)
    .delay((d, i) => 1000 + i * 200)
    .attr('width', d => (d.value > 0 ? 100 : 0))

  bars.append('text')
    .attr('class', 'skill-name')
    .attr('y', d => y(d.skill) + y.bandwidth() / 2)
    .attr('x', d => 50)
    .text(d => (d.skill !== '' ? d.skill : ''))
    .style('opacity', 0)
    .transition()
    .duration(400)
    .delay((d, i) => 1000 + i * 200)
    .style('opacity', 1)

  // percentage
  bars.append('text')
    .attr('class', 'skill-value')
    .attr('y', d => y(d.skill) + y.bandwidth() / 2)
    .attr('x', d => x(d.value) + 100  + 20)
    .text(d => (d.value > 0 ? `${d.value*100}%` : ''))
    .style('opacity', 0)
    .transition()
    .duration(400)
    .delay((d, i) => 2200 + i * 200)
    .style('opacity', 1)
}

const ScrollOverPack = ScrollAnim.OverPack

class Skills extends Component {

  render() {
    return (
      <div style={{position: 'relative'}} id="skill-page" className="skill-page">
        <div className="skill-chart-wrap">
          <svg id="skill-chart" width={500} height={300} />
        </div>
        <ScrollOverPack id="skill-page" playScale={0.5} always={false}
         onChange={({mode, id}) => { if (mode === 'enter') updateD3Node() }}>
          <Texty key='0' type="left" mode="smooth" className="section-title" delay={500}>SKILLS</Texty>
          <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: 750, duration: 1000}} />
        </ScrollOverPack>
      </div>
    );
  }
}

export default Skills;
