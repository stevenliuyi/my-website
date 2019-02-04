import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'
import TweenOne from 'rc-tween-one'
import ProgressiveImage from 'react-progressive-image-loading'
import { getImageURL } from '../utils/utils'

class BookDetail extends Component {
  state = {
    tooltips: {
      douban: false,
      goodreads: false,
      wikidata: false
    }
  }

  tooltipToggle = link => {
    let tooltips = this.state.tooltips
    tooltips[link] = !tooltips[link]
    this.setState({ tooltips })
  }

  handleScroll = e => {
    const quotes = document.querySelector('.book-quotes')
    const title = document.querySelector('.cover-title')
    if (quotes == null || title == null) return

    const scrollTop =
      document.documentElement.scrollTop || document.scrollingElement.scrollTop
    const position = quotes.offsetTop - scrollTop

    if (position > 0) {
      title.style.color = 'rgb(34, 34, 34)' // #222
    } else if (position < -200) {
      title.style.color = 'rgb(255, 255, 255)'
    } else {
      const c = 34 - (position / 200) * (255 - 34)
      title.style.color = `rgb(${c}, ${c}, ${c})`
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)

    const title = document.querySelector('.cover-title')
    if (title != null) title.style.color = 'rgb(34, 34, 34)' // #222
  }

  render() {
    const linkAnimation = {
      opacity: 0,
      scale: 0,
      type: 'from',
      delay: this.props.delay + 300
    }

    return (
      <div>
        <div className="book-detail">
          <div className="book-detail-background" />
          <TweenOne
            animation={{
              translateY: 150,
              type: 'from',
              delay: this.props.delay
            }}
            className="book-detail-img"
          >
            <ProgressiveImage
              preview={
                process.env.NODE_ENV === 'development'
                  ? `/images/books/${this.props.image}`
                  : getImageURL(`books/${this.props.image}`, {
                      f: 'auto',
                      c: 'scale',
                      w: 143 * window.devicePixelRatio,
                      h: 200 * window.devicePixelRatio
                    })
              }
              src={
                process.env.NODE_ENV === 'development'
                  ? `/images/books/${this.props.image}`
                  : getImageURL(`books/${this.props.image}`, {
                      f: 'auto',
                      c: 'scale',
                      w: 285 * window.devicePixelRatio,
                      h: 399 * window.devicePixelRatio
                    })
              }
              initialBlur={0}
              render={(src, style) => (
                <img
                  className="noselect"
                  src={src}
                  style={style}
                  alt={this.props.name}
                  width={285}
                  height={399}
                  onError={e => {
                    e.target.src =
                      'https://imgplaceholder.com/285x399/f5f5f5/757575/ion-ios-book-outline?font-size=64'
                  }}
                />
              )}
            />
          </TweenOne>
          <div className="book-detail-info">
            <TweenOne
              animation={{
                opacity: 0,
                translateX: 150,
                type: 'from',
                delay: this.props.delay
              }}
              className="book-detail-title"
            >
              {this.props.name}
            </TweenOne>
            <TweenOne
              animation={{
                opacity: 0,
                translateX: 150,
                type: 'from',
                delay: this.props.delay + 100
              }}
              className="book-detail-author"
            >
              {this.props.authors.join(', ')}
            </TweenOne>
            <TweenOne
              animation={{
                opacity: 0,
                translateX: 150,
                type: 'from',
                delay: this.props.delay + 200
              }}
              className="book-detail-tags"
            >
              {this.props.tags != null &&
                this.props.tags.map((tag, i) => (
                  <span key={`tag-${i}`} className="book-detail-tag noselect">
                    {tag}
                  </span>
                ))}
            </TweenOne>
            <div className="book-detail-links">
              {this.props.douban && (
                <TweenOne
                  animation={linkAnimation}
                  id="douban"
                  className="book-detail-link"
                >
                  <a
                    href={`https://book.douban.com/subject/${
                      this.props.douban
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="iconfont icon-douban" />
                  </a>
                  <Tooltip
                    placement="top"
                    target="douban"
                    isOpen={this.state.tooltips.douban}
                    toggle={() => this.tooltipToggle('douban')}
                  >
                    Douban
                  </Tooltip>
                </TweenOne>
              )}
              {this.props.goodreads && (
                <TweenOne
                  animation={linkAnimation}
                  id="goodreads"
                  className="book-detail-link"
                >
                  <a
                    href={`https://www.goodreads.com/book/show/${
                      this.props.goodreads
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="iconfont icon-goodreads" />
                  </a>
                  <Tooltip
                    placement="top"
                    target="goodreads"
                    isOpen={this.state.tooltips.goodreads}
                    toggle={() => this.tooltipToggle('goodreads')}
                  >
                    Goodreads
                  </Tooltip>
                </TweenOne>
              )}
              {this.props.wikidata && (
                <TweenOne
                  animation={linkAnimation}
                  id="wikidata"
                  className="book-detail-link noselect"
                >
                  <a
                    href={`https://www.wikidata.org/wiki/${
                      this.props.wikidata
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex' }}
                  >
                    <img
                      alt="wikidata"
                      src="images/wikidata.svg"
                      width={16}
                      height={16}
                    />
                  </a>
                  <Tooltip
                    placement="top"
                    target="wikidata"
                    isOpen={this.state.tooltips.wikidata}
                    toggle={() => this.tooltipToggle('wikidata')}
                  >
                    Wikidata
                  </Tooltip>
                </TweenOne>
              )}
            </div>
          </div>
        </div>
        {this.props.quotes != null && (
          <div className="book-quotes">
            <div className="book-quotes-icon noselect">‘</div>
            <div className="section-title noselect">QUOTES</div>
            <div
              className="underline"
              style={{ transform: 'translateX(0)', opacity: 1 }}
            />
            {this.props.quotes.map((quote, i) => (
              <div key={`quote-${i}`} className="book-quote">
                <div dangerouslySetInnerHTML={{ __html: quote }} />
                <div className="book-quote-left" />
                <div className="book-quote-right" />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default BookDetail
