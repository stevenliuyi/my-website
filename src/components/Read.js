import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import Page from './Page'
import Book from './Book'
import BookDetail from './BookDetail'
import readingList from '../data/read.yml'

class Read extends Component {
  state = {
    listWidth: 0,
    currentIdx: -1
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
      duration: 0
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
            {readingList.map((book, idx) => (
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
          <BookDetail {...readingList[this.state.currentIdx]} />
        )}
      </Page>
    )
  }
}

export default Read
