import React, { Component } from 'react'
import MoreButton from './MoreButton'
import { Link } from 'react-router-dom'

class PageNotFound extends Component {
  render() {
    return (
      <div className="notfound-page">
        <div className="notfound-oops noselect">Oops!</div>
        <div className="notfound-text">Page not found</div>
        <div>
          Unless this 404 error page is exactly what you are looking for. Then
          congrats, you totally found it!
        </div>
        <Link to="/">
          <MoreButton title={'Back to Home'} />
        </Link>
      </div>
    )
  }
}

export default PageNotFound
