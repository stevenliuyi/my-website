import React, { Component } from 'react'

class Logo extends Component {
  render() {
    const { radius, colors } = this.props
    const size = radius * Math.sqrt(3)
    const space = 0.05 * size

    return (
      <svg width={radius * 2} height={radius * 2}>
        <g transform={`translate(${radius - size * 0.5} ${radius * 0.5})`}>
          <path
            d={`M 0 0 H ${size} L ${size * 0.75} ${
              size * 0.25 * Math.sqrt(3)
            } L 0 0`}
            fill={colors[0]}
          />
          <path
            d={`M ${size * 0.75 - space * 0.5} ${
              size * 0.25 * Math.sqrt(3) + space * 0.5 * Math.sqrt(3)
            } L ${size * 0.5} ${size * 0.5 * Math.sqrt(3)} V ${
              (size * 0.5) / Math.sqrt(3) + (space * 2) / Math.sqrt(3)
            } Z`}
            fill={colors[1]}
          />
        </g>
      </svg>
    )
  }
}

export default Logo
