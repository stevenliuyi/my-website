import React, { Component } from 'react';

class Logo extends Component {

  render() {

    const { radius, colors } = this.props
    const size = radius * Math.sqrt(3)
    const space = .05 * size

    return (
      <svg width={radius*2} height={radius*2}>
        <g transform={`translate(${radius-size*.5} ${radius*.5})`}>
          <path d={`M 0 0 H ${size} L ${size*.75} ${size*.25*Math.sqrt(3)} L 0 0`} fill={colors[0]} />
          <path d={`M ${size*.75-space*.5} ${size*.25*Math.sqrt(3)+space*.5*Math.sqrt(3)} L ${size*.5} ${size*.5*Math.sqrt(3)} V ${size*.5/Math.sqrt(3)+space*2/Math.sqrt(3)}`} fill={colors[1]} />
        </g>
      </svg>
    );
  }
}

export default Logo;
