import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import Page from './Page'
import Book from './Book'
import BookDetail from './BookDetail'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import InfiniteScroll from 'react-infinite-scroller'
import { IoIosSearch } from 'react-icons/io'

const ScrollOverPack = ScrollAnim.OverPack

class Read extends Component {
  state = {
    listWidth: 0,
    currentIdx: -1,
    readingList: [],
    nBooksLoaded: 10,
    allLoaded: false,
    delay: 150,
    searchText: ''
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

  loadMoreBooks = () => {
    if (this.state.readingList.length === 0 || this.state.allLoaded) return
    if (this.state.nBooksLoaded === this.state.readingList.length) {
      this.setState({ allLoaded: true })
      return
    }
    const nBooksLoaded = Math.min(
      this.state.readingList.length,
      this.state.nBooksLoaded + 10
    )
    this.setState({ nBooksLoaded })
  }

  componentDidMount() {
    // dynamically import reading list
    import('../data/read.yml')
      .then(m => m.default)
      .then(data => this.setState({ readingList: data }))

    scrollToComponent(this.page, { align: 'top', duration: 1 })
    this.calcListWidth()
    window.addEventListener('resize', this.calcListWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcListWidth)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentIdx === -1 && prevState.currentIdx >= 0) {
      const bookElem = document.getElementById(`book-${prevState.currentIdx}`)
      if (bookElem != null) {
        bookElem.scrollIntoView()
      } else {
        scrollToComponent(this.page, {
          align: 'top',
          duration: 1,
          offset: window.innerHeight
        })
      }
    }

    if (this.state.searchText !== prevState.searchText)
      this.setState({ nBooksLoaded: 10, allLoaded: false })
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
      <ScrollOverPack scale={0.5} always={false}>
        <Page
          ref={el => (this.page = el)}
          title="READ"
          quote="It is what you read when you don't have to that determines what you will be when you can't help it."
          author="Oscar Wilde"
          backgroundFilename="olia-gozha-678463-unsplash"
          onTitleClick={() => this.setState({ currentIdx: -1 })}
          delay={this.state.delay}
          titleStyle={{
            cursor: this.state.currentIdx === -1 ? 'inherit' : 'pointer'
          }}
          footerStyle={{
            backgroundColor:
              this.state.currentIdx === -1
                ? '#fff'
                : this.state.readingList[this.state.currentIdx].quotes == null
                ? '#eee'
                : '#555',
            color:
              this.state.currentIdx === -1
                ? '#000'
                : this.state.readingList[this.state.currentIdx].quotes == null
                ? '#000'
                : '#fff'
          }}
          {...this.props}
        >
          {this.state.currentIdx === -1 && (
            <div className="cover-text">
              The reading list is not completed yet and is still under
              construction.
            </div>
          )}
          {this.state.currentIdx === -1 && (
            <TweenOne
              className="reading-list"
              style={{ width: this.state.listWidth }}
              animation={{
                opacity: 0,
                type: 'from',
                delay: this.state.delay,
                duration: 1000
              }}
              component={InfiniteScroll}
              componentProps={{
                loadMore: this.loadMoreBooks,
                hasMore: !this.state.allLoaded
              }}
            >
              <div className="book-search">
                <IoIosSearch color={'#aaa'} />
                <input
                  type="text"
                  value={this.state.searchText}
                  onChange={e => this.setState({ searchText: e.target.value })}
                  placeholder="Search..."
                  className="book-searchbox"
                />
              </div>
              {this.state.readingList
                .slice(0, this.state.nBooksLoaded)
                .map((book, idx) =>
                  this.state.searchText === '' ||
                  book.name
                    .toLowerCase()
                    .includes(this.state.searchText.toLowerCase()) ||
                  (book.original_name != null &&
                    book.original_name
                      .toLowerCase()
                      .includes(this.state.searchText.toLowerCase())) ? (
                    <Book
                      id={`book-${idx}`}
                      key={idx}
                      onSelectBook={this.onSelectBook}
                      idx={idx}
                      {...book}
                    />
                  ) : (
                    <div key={idx} />
                  )
                )}
            </TweenOne>
          )}
          {this.state.currentIdx >= 0 && (
            <BookDetail
              delay={this.state.delay}
              {...this.state.readingList[this.state.currentIdx]}
            />
          )}
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Read
