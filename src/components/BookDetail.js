import React, { Component } from 'react'

class BookDetail extends Component {
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
            {this.props.douban && (
              <a
                href={`https://book.douban.com/subject/${this.props.douban}/`}
                className="douban"
                target="_blank"
              >
                豆
              </a>
            )}
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
