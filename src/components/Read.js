import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import Page from './Page'
import Book from './Book'
import BookDetail from './BookDetail'

class Read extends Component {
  state = {
    listWidth: 0,
    currentIdx: -1,
    readingList: []
  }

  calcListWidth = () => {
    const coverWidth = 143
    const coverPadding = 20
    const numOfBooksPerLine = Math.floor(
      (window.innerWidth * 0.8) / (coverWidth + coverPadding * 2)
    )
    const listWidth = numOfBooksPerLine * (coverWidth + coverPadding * 2)
    this.setState({ listWidth })
  }

  componentDidMount() {
    // dynamically import reading list
    import('../data/read.yml').then(data =>
      this.setState({ readingList: data })
    )

    scrollToComponent(this.page, { align: 'top', duration: 1 })
    this.calcListWidth()
    window.addEventListener('resize', this.calcListWidth)
  }

  componentWillUnMount() {
    window.removeEventListner('resize', this.calcListWidth)
  }

  onSelectBook = idx => {
    this.setState({ currentIdx: idx })
    scrollToComponent(this.page, {
      align: 'top',
      offset: window.innerHeight,
      duration: 1
    })
  }

  render() {
    return (
      <Page
        ref={el => (this.page = el)}
        title="READ"
        quote="It is what you read when you don't have to that determines what you will be when you can't help it."
        author="Oscar Wilde"
        backgroundFilename="olia-gozha-678463-unsplash"
        onTitleClick={() => this.setState({ currentIdx: -1 })}
      >
        {this.state.currentIdx === -1 && (
          <div className="reading-list" style={{ width: this.state.listWidth }}>
            {this.state.readingList.map((book, idx) => (
              <Book
                key={idx}
                onSelectBook={this.onSelectBook}
                idx={idx}
                {...book}
              />
            ))}
          </div>
        )}
        {this.state.currentIdx >= 0 && (
          <BookDetail {...this.state.readingList[this.state.currentIdx]} />
        )}
      </Page>
    )
  }
}

export default Read
