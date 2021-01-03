import React, { Component } from 'react'
import { Card, CardText } from 'reactstrap'
import TweenOne from 'rc-tween-one'

class GithubCard extends Component {
  render() {
    return (
      <TweenOne
        className="github-card"
        animation={{
          opacity: 0,
          translateX: 200,
          delay: 200,
          duration: 1000,
          type: 'from',
        }}
      >
        <Card body>
          <CardText className="github-card-desc noselect">
            {this.props.description}
          </CardText>
          <div className="github-card-number noselect">{this.props.number}</div>
        </Card>
      </TweenOne>
    )
  }
}

export default GithubCard
