import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'

class SimpleTooltip extends Component {
  state = {
    tooltipOpen: false
  }

  render() {
    const placement =
      this.props.placement != null ? this.props.placement : 'top'
    return (
      <span>
        <span id={this.props.id}>{this.props.children}</span>
        <Tooltip
          placement={placement}
          isOpen={this.state.tooltipOpen}
          target={this.props.id}
          toggle={() => this.setState({ tooltipOpen: !this.state.tooltipOpen })}
        >
          {this.props.text}
        </Tooltip>
      </span>
    )
  }
}

export default SimpleTooltip
