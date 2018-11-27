import React, { Component } from 'react'

class PortfolioWork extends Component {
  render() {
    return (
      <div className="portfolio-work" style={{ margin: this.props.margin }}>
        <div
          className={`portfolio-img ${
            this.props.photo.white ? 'portfolio-img-white' : ''
          }`}
          style={{
            width: this.props.photo.width,
            height: this.props.photo.height,
            backgroundImage: `url(${this.props.photo.src})`
          }}
        >
          <div className="portfolio-year">{this.props.photo.time}</div>
        </div>
        <div
          className="portfolio-title"
          style={{ width: this.props.photo.width }}
        >
          {this.props.photo.name}
        </div>
      </div>
    )
  }
}

export default PortfolioWork
