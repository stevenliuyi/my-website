import React, { Component } from 'react'
import { MdArrowForward } from 'react-icons/md'
import TweenOne from 'rc-tween-one'

class MoreButton extends Component {
  render() {
    return (
      <TweenOne
        animation={{
          opacity: 0,
          translateY: 50,
          type: 'from',
          delay: this.props.delay,
        }}
        className="more-button noselect"
      >
        <div className="more-button-front">
          <span>{this.props.title}</span>
          <MdArrowForward className="more-button-arrow" size={24} />
        </div>
        <div className="more-button-background" />
      </TweenOne>
    )
  }
}

export default MoreButton
