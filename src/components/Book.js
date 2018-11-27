import React, { Component } from 'react'
import { getImageURL } from '../utils/utils'

class Book extends Component {
  render() {
    return (
      <div
        id={this.props.id}
        className="book"
        onClick={() => this.props.onSelectBook(this.props.idx)}
        onMouseEnter={() => {
          const imgElem = document.getElementById(`img-${this.props.image}`)
          if (imgElem == null) return
          // preload large image on hover
          imgElem.style.backgroundImage =
            process.env.NODE_ENV === 'development'
              ? `url(/images/books/${this.props.image})`
              : `url(${getImageURL(`books/${this.props.image}`, {
                  f: 'auto',
                  c: 'scale',
                  w: 285 * window.devicePixelRatio,
                  h: 399 * window.devicePixelRatio
                })})`
        }}
      >
        <img
          id={`img-${this.props.image}`}
          className="noselect"
          alt={this.props.name}
          src={
            process.env.NODE_ENV === 'development'
              ? `/images/books/${this.props.image}`
              : getImageURL(`books/${this.props.image}`, {
                  f: 'auto',
                  c: 'scale',
                  w: 143 * window.devicePixelRatio,
                  h: 200 * window.devicePixelRatio
                })
          }
          width={143}
          height={200}
          onError={e => {
            e.target.src =
              'https://imgplaceholder.com/143x200/f5f5f5/757575/ion-ios-book-outline?font-size=64'
          }}
        />
        <div className="book-title">{this.props.name}</div>
        <div className="title-underline" />
      </div>
    )
  }
}

export default Book
