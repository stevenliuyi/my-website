import React, { Component } from 'react'
import { MdPageview, MdOpenInNew, MdFileDownload } from 'react-icons/md'
import { isMobile } from 'react-device-detect'
import { triggerUnsplashDownload } from '../utils/unsplash'

class Photo extends Component {
  state = {
    titleWidth: -1,
    imageWidth: -1
  }

  render() {
    const { index, onClick, photo, margin } = this.props
    const emptyLink = '#0' // get around the anchor-is-valid warning
    return (
      <div
        className="photography-work"
        style={{ margin: margin, width: photo.width, height: photo.height }}
        onClick={e => onClick(e, { index, photo })}
      >
        <div className="photography-hover">
          <img
            className="photography-img"
            alt={photo.description}
            src={photo.src_small}
            style={{
              width: photo.width,
              height: photo.height
            }}
          />
          {!isMobile && (
            <div className="photography-overlay">
              <a
                onClick={e => e.stopPropagation()}
                href={photo.link}
                title="Check the photo on Unsplash"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdOpenInNew size={18} />
              </a>
              <a
                onClick={e => {
                  e.stopPropagation()
                  // send request to unsplash download endpoint
                  triggerUnsplashDownload(photo.download_location)
                }}
                href={photo.download_link}
                title="Download the photo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdFileDownload size={18} />
              </a>
              <a
                onClick={e => onClick(e, { index, photo })}
                href={emptyLink}
                title="View the photo"
              >
                <MdPageview size={18} />
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Photo
