import React, { Component } from 'react'
import Page from './Page'
import Book from './Book'
import readingList from '../data/read.yml'

class Read extends Component {
  state = {
    listWidth: 0
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

  render() {
    return (
      <Page
        title="READ"
        quote="It is what you read when you don't have to that determines what you will be when you can't help it."
        author="Oscar Wilde"
        backgroundFilename="olia-gozha-678463-unsplash"
      >
        <div className="reading-list" style={{ width: this.state.listWidth }}>
          {readingList.map((book, idx) => (
            <Book key={idx} {...book} />
          ))}
        </div>
      </Page>
    )
  }
}

export default Read
