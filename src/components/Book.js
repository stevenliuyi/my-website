import React, { Component } from 'react'

class Book extends Component {
  render() {
    return (
      <div
        id={this.props.id}
        className="book"
        onClick={() => this.props.onSelectBook(this.props.idx)}
      >
        <img
          className="noselect"
          alt={this.props.name}
          src={`images/books/${this.props.image}`}
          width={143}
          height={200}
          onError={e => {
            e.target.src =
              'https://imgplaceholder.com/143x200/f5f5f5/757575/ion-ios-book-outline?font-size=64'
          }}
        />
        <div className="book-title">{this.props.name}</div>
        <div className="book-title-underline" />
      </div>
    )
  }
}

export default Book
