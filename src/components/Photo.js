import React, { Component } from 'react'

class Photo extends Component {
  state = {
    titleWidth: -1,
    imageWidth: -1
  }

  render() {
    const { index, onClick, photo, margin } = this.props
    return (
      <div
        className="photography-work"
        style={{ margin: margin }}
        onClick={e => onClick(e, { index, photo })}
      >
        <div
          className="photography-img"
          style={{
            width: photo.width,
            height: photo.height,
            backgroundImage: `url(${photo.src_full})`
          }}
        />
      </div>
    )
  }
}

export default Photo
