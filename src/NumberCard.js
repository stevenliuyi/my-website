import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap'

class NumberCard extends Component {

  render() {
    return (
      <div className="number-card">
        <Card body>
          <CardText className="number-desc">{ this.props.description }</CardText>
          <div className="number">{ this.props.number }</div>
        </Card>
      </div>
    );
  }
}

export default NumberCard;
