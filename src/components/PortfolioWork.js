import React, { Component } from 'react'
import Measure from 'react-measure'
import { GoLinkExternal } from 'react-icons/go'
import { getImageURL } from '../utils/utils'

class PortfolioWork extends Component {
  state = {
    titleWidth: -1,
    imageWidth: -1,
  }

  calcRatio = () => {
    const ratio = Math.max(
      Math.ceil(
        ((this.props.photo.width * window.devicePixelRatio) /
          this.props.photo.originalWidth) *
          10
      ) / 10,
      0.1
    )
    return ratio
  }

  render() {
    const { index, onClick, photo, margin } = this.props
    return (
      <div
        className="portfolio-work"
        style={{ margin: margin }}
        onClick={(e) => onClick(e, { index, photo })}
      >
        <div
          className={`portfolio-img ${
            photo.white ? 'portfolio-img-white' : ''
          }`}
          style={{
            width: photo.width,
            height: photo.height,
            backgroundImage:
              process.env.NODE_ENV === 'development'
                ? `url(/images/portfolio/${photo.filename})`
                : // set the width ratio if the expect image size is smaller than the original size
                this.calcRatio() < 1
                ? `url(${getImageURL(`portfolio/${photo.filename}`, {
                    f: 'auto',
                    c: 'scale',
                    w: this.calcRatio(),
                  })})`
                : `url(${getImageURL(`portfolio/${photo.filename}`, {
                    f: 'auto',
                  })})`,
          }}
        >
          <div className="portfolio-year">{photo.time}</div>
        </div>
        <div className="portfolio-title-wrap">
          <Measure
            bounds
            onResize={(contentRect) => {
              this.setState({ titleWidth: contentRect.bounds.width })
            }}
          >
            {({ measureRef }) => (
              <div
                ref={measureRef}
                className="portfolio-title"
                style={{ maxWidth: photo.width }}
              >
                <span>{photo.name}</span>
                {photo.link != null && (
                  <a
                    href={photo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GoLinkExternal className="portfolio-link" />
                  </a>
                )}
              </div>
            )}
          </Measure>
        </div>
        <div className="portfolio-title-wrap">
          <div
            className="title-underline"
            style={{ width: this.state.titleWidth, maxWidth: photo.width }}
          />
        </div>
      </div>
    )
  }
}

export default PortfolioWork
