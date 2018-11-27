import React, { Component } from 'react'

class PortfolioWork extends Component {
  render() {
    const { index, onClick, photo, margin } = this.props
    return (
      <div
        className="portfolio-work"
        style={{ margin: margin }}
        onClick={e => onClick(e, { index, photo })}
      >
        <div
          className={`portfolio-img ${
            photo.white ? 'portfolio-img-white' : ''
          }`}
          style={{
            width: photo.width,
            height: photo.height,
            backgroundImage: `url(${photo.src})`
          }}
        >
          <div className="portfolio-year">{photo.time}</div>
        </div>
        <div className="portfolio-title" style={{ width: photo.width }}>
          {photo.name}
        </div>
      </div>
    )
  }
}

export default PortfolioWork
