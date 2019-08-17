import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import scrollToComponent from 'react-scroll-to-component'
import ScrollAnim from 'rc-scroll-anim'
import Gallery from 'react-photo-gallery'
import Measure from 'react-measure'
import Lightbox from 'react-images'
import InfiniteScroll from 'react-infinite-scroller'
import { isMobile } from 'react-device-detect'
import { MdFileDownload } from 'react-icons/md'
import Page from './Page'
import Photo from './Photo'
import MoreButton from './MoreButton'
import { fetchUnsplashPhotos, triggerUnsplashDownload } from '../utils/unsplash'
import { lightboxTheme, numOfColumns } from '../utils/gallery'

const ScrollOverPack = ScrollAnim.OverPack

class Photography extends Component {
  state = {
    photos: [],
    width: -1,
    currentImage: 0,
    currentPage: 1,
    hasMorePhotos: true,
    lightboxIsOpen: false,
    delay: 150
  }

  fetchPhotos = page => {
    fetchUnsplashPhotos(page).then(photos => {
      if (photos != null && photos.length > 0) {
        // add new photos to the array
        this.setState({
          photos: [
            ...this.state.photos,
            ...photos.map(p => ({
              caption: this.lightboxCaption(p),
              ...p
            }))
          ]
        })
      } else {
        // no more new photos
        this.setState({ hasMorePhotos: false })
      }
    })
  }

  componentDidMount() {
    scrollToComponent(this.page, { align: 'top', duration: 1 })
    this.fetchPhotos(this.state.currentPage)
  }

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    })
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    })
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    })
  }

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    })
  }

  onClickImage = e => {
    window.open(this.state.photos[this.state.currentImage].link, '_blank')
  }

  lightboxCaption = photo => {
    const unsplashButton = renderToString(
      <a
        className="unsplash-link"
        href={photo.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span
          style={{
            display: 'inline-block'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="unsplash-logo"
            viewBox="0 0 32 32"
          >
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
          </svg>
        </span>
        <span
          className="photography-btn-text noselect"
          style={{ padding: '0px 1px 0px 7px' }}
        >
          Unsplash
        </span>
      </a>
    )

    const downloadButton = renderToString(
      <a
        onClick={e => {
          e.stopPropagtaion()
          // send request to unsplash download endpoint
          triggerUnsplashDownload(photo.download_location)
        }}
        className="unsplash-download-link"
        href={photo.download_link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MdFileDownload size={16} style={{ transform: 'translateY(1px)' }} />
        <span
          className="photography-btn-text noselect"
          style={{ padding: '0px 3px' }}
        >
          Download
        </span>
      </a>
    )

    return `<span className="photography-caption"><span>${
      photo.description ? photo.description : ''
    }</span><span className="photography-btns">${unsplashButton} ${downloadButton}</span></span>`
  }

  render() {
    const width = this.state.width

    return (
      <ScrollOverPack scale={0.5} always={false}>
        <Page
          ref={el => (this.page = el)}
          title="PHOTOGRAPHY"
          quote="All photographs are accurate. None of them is the truth."
          author="Richard Avedon"
          backgroundFilename="adrian-pelletier-6dOpTj_KYc4-unsplash"
          delay={this.state.delay}
          {...this.props}
        >
          <div className="cover-text">
            <span>
              All the photographs here are published on{' '}
              <a
                href="https://unsplash.com/?utm_source=yliu&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>{' '}
              under{' '}
              <a
                href="https://unsplash.com/license"
                target="_blank"
                rel="noopener noreferrer"
              >
                a CC0-like license
              </a>{' '}
              which allows everyone to use them freely. Most of the photos are
              also dual-licensed under{' '}
              <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                CC BY-SA 4.0
              </a>{' '}
              on{' '}
              <a
                href="https://commons.wikimedia.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikimedia Commons
              </a>
              .
            </span>
          </div>
          <div className="photography-list" style={{ height: '100%' }}>
            <Measure
              bounds
              onResize={contentRect =>
                this.setState({ width: contentRect.bounds.width })
              }
            >
              {({ measureRef }) => {
                if (width < 1) return <div ref={measureRef} />
                return (
                  <div ref={measureRef}>
                    {/* see comments on Page.js for the scrolling element */}
                    <InfiniteScroll
                      loadMore={() => {
                        this.fetchPhotos(this.state.currentPage + 1)
                        this.setState({
                          currentPage: this.state.currentPage + 1
                        })
                      }}
                      hasMore={this.state.hasMorePhotos}
                      initialLoad={false}
                      useWindow={isMobile}
                      getScrollElement={
                        isMobile
                          ? null
                          : () => document.getElementById('cover-content')
                      }
                    >
                      <Gallery
                        photos={this.state.photos}
                        ImageComponent={Photo}
                        columns={numOfColumns(width)}
                        margin={4}
                        onClick={this.openLightbox}
                      />
                    </InfiniteScroll>
                  </div>
                )
              }}
            </Measure>
            <Lightbox
              images={this.state.photos}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              onClickImage={this.onClickImage}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
              theme={lightboxTheme}
              spinnerColor={'#aaa'}
              showCloseButton={isMobile}
              backdropClosesModal={true}
            />
            {!this.state.hasMorePhotos && (
              <a
                href="https://unsplash.com/@stevenliuyi?utm_source=yliu&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MoreButton title="My Unsplash profile" delay={500} />
              </a>
            )}
          </div>
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Photography
