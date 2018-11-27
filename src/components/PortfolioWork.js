import React, { Component } from 'react'
import Measure from 'react-measure'
import { getImageURL } from '../utils/utils'

class PortfolioWork extends Component {
  state = {
    titleWidth: -1,
    imageWidth: -1
  }

  render() {
    const { index, onClick, photo, margin } = this.props
    return (
      <div
        className="portfolio-work"
        style={{ margin: margin }}
        onClick={e => onClick(e, { index, photo })}
      >
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ imageWidth: contentRect.bounds.width })
          }}
        >
          {({ measureRef }) => (
            <div
              ref={measureRef}
              className={`portfolio-img ${
                photo.white ? 'portfolio-img-white' : ''
              }`}
              style={{
                width: photo.width,
                height: photo.height,
                backgroundImage:
                  process.env.NODE_ENV === 'development'
                    ? `url(/images/portfolio/${photo.filename})`
                    : `url(${getImageURL(`portfolio/${photo.filename}`, {
                        f: 'auto',
                        c: 'scale',
                        w: this.state.imageWidth * window.devicePixelRatio
                      })})`
              }}
            >
              <div className="portfolio-year">{photo.time}</div>
            </div>
          )}
        </Measure>
        <div className="portfolio-title-wrap">
          <Measure
            bounds
            onResize={contentRect => {
              this.setState({ titleWidth: contentRect.bounds.width })
            }}
          >
            {({ measureRef }) => (
              <div
                ref={measureRef}
                className="portfolio-title"
                style={{ maxWidth: photo.width }}
              >
                {photo.name}
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
