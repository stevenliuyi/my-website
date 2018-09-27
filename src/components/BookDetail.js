import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'

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

  render() {
    return (
      <div>
        <div className="book-detail">
          <div className="book-detail-background" />
          <div className="book-detail-img">
            <img
              className="noselect"
              alt={this.props.name}
              src={`images/books/${this.props.image}`}
              width={285}
              height={399}
            />
          </div>
          <div className="book-detail-info">
            <div className="book-detail-title">{this.props.name}</div>
            <div className="book-detail-author">
              {this.props.authors.join(', ')}
            </div>
            <div className="book-detail-tags">
              {this.props.tags != null &&
                this.props.tags.map((tag, i) => (
                  <span key={`tag-${i}`} className="book-detail-tag noselect">
                    {tag}
                  </span>
                ))}
            </div>
            <div className="book-detail-links">
              {this.props.douban && (
                <div id="douban" className="book-detail-link">
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
                </div>
              )}
              {this.props.goodreads && (
                <div id="goodreads" className="book-detail-link">
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
                </div>
              )}
              {this.props.wikidata && (
                <div id="wikidata" className="book-detail-link">
                  <a
                    href={`https://www.wikidata.org/wiki/${
                      this.props.wikidata
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="wikidata"
                      src="/images/wikidata.svg"
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
                </div>
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
