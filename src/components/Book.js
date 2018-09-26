import React, { Component } from 'react'

class Book extends Component {
  render() {
    return (
      <div className="book">
        <img
          alt={this.props.name}
          src={`images/books/${this.props.image}`}
          width={143}
          height={200}
        />
        <div className="book-title">{this.props.name}</div>
      </div>
    )
  }
}

export default Book
