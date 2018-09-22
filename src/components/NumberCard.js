import React, { Component } from 'react'
import { Card, CardText } from 'reactstrap'
import TweenOne from 'rc-tween-one'

class NumberCard extends Component {
  state = {
    front: true,
    paused: true,
    reverse: false
  }

  switch = () => {
    this.setState({
      paused: false,
      reverse: !this.state.front,
      front: !this.state.front
    })
  }

  render() {
    return (
      <div
        className="number-card"
        onMouseEnter={this.switch}
        onMouseLeave={this.switch}
        onTouchStart={this.switch}
      >
        <TweenOne
          animation={{ opacity: 0, scaleY: 0 }}
          paused={this.state.paused}
          reverse={this.state.reverse}
          className="number-card-front"
        >
          <Card body>
            <CardText className="number-desc">
              {this.props.description}
            </CardText>
            <div className="number noselect">{this.props.number}</div>
          </Card>
        </TweenOne>
        <TweenOne
          animation={{ opacity: 1, scaleY: 1 }}
          paused={this.state.paused}
          reverse={this.state.reverse}
          className="number-card-back"
        >
          <Card body>
            <CardText>{this.props.detail}</CardText>
          </Card>
        </TweenOne>
      </div>
    )
  }
}

export default NumberCard
