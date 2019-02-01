import React, { Component } from 'react'
import TweenOne from 'rc-tween-one'
import SvgDrawPlugin from 'rc-tween-one/lib/plugin/SvgDrawPlugin'
import { withRouter } from 'react-router-dom'

TweenOne.plugins.push(SvgDrawPlugin)

class MoreItem extends Component {
  // open link until the animation is completed on touch devices
  handleTouchEnd = e => {
    e.preventDefault()
    this.circleElement.addEventListener('transitionend', this.openLink)
  }

  openLink = () => {
    setTimeout(() => {
      this.circleElement.removeEventListener('transitionend', this.openLink)
      if (this.props.url != null) {
        window.location.href = this.props.url
      } else {
        this.props.history.push(this.props.link)
      }
    }, 100)
  }

  render() {
    return (
      <div
        className="more-item"
        onMouseUp={() =>
          this.props.url != null
            ? window.open(this.props.url, '_blank')
            : this.props.history.push(this.props.link)
        }
        onTouchEnd={this.handleTouchEnd}
      >
        <svg width="260" height="260" className="more-circle-svg">
          <circle
            cx="130"
            cy="130"
            r="125"
            className="more-circle-back"
            ref={el => (this.circleElement = el)}
          />
          <circle cx="130" cy="130" r="125" className="more-circle" />
          <TweenOne
            component="circle"
            animation={{
              SVGDraw: 0,
              delay: this.props.delay + 200,
              duration: 1000
            }}
            cx="130"
            cy="130"
            r="125"
            className="more-circle-anim"
          />
        </svg>
        <div
          className="more-item-pic"
          style={{ backgroundImage: `url(/images/${this.props.pic})` }}
        />
        <TweenOne
          key="0"
          animation={{
            opacity: 0,
            type: 'from',
            delay: this.props.delay + 500,
            duration: 1000
          }}
          className="more-item-title noselect"
        >
          {this.props.title}
        </TweenOne>
        <TweenOne
          key="1"
          animation={{
            opacity: 0,
            type: 'from',
            delay: this.props.delay + 500,
            duration: 1000
          }}
          className="more-item-number noselect"
        >
          {this.props.number}
        </TweenOne>
        <TweenOne
          key="2"
          animation={{
            opacity: 0,
            type: 'from',
            delay: this.props.delay + 500,
            duration: 1000
          }}
          className="more-item-description noselect"
        >
          {this.props.description}
        </TweenOne>
        <TweenOne
          animation={{
            opacity: 0,
            type: 'from',
            delay: this.props.delay + 500,
            duration: 1000
          }}
          className="more-item-logo"
        >
          {this.props.logo}
        </TweenOne>
      </div>
    )
  }
}

export default withRouter(MoreItem)
