import React, { Component } from 'react'
import { TiHeart } from 'react-icons/ti'

class PageFooter extends Component {
  render() {
    return (
      <div className="cover-footer" style={this.props.footerStyle}>
        <span>© {new Date().getFullYear()} | Handcrafted with</span>
        <span className="heart">
          <TiHeart size={14} />
        </span>
        <span>by YI LIU</span>
      </div>
    )
  }
}

export default PageFooter
