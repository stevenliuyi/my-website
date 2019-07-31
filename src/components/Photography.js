import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import scrollToComponent from 'react-scroll-to-component'
import ScrollAnim from 'rc-scroll-anim'
import Gallery from 'react-photo-gallery'
import Measure from 'react-measure'
import Lightbox from 'react-images'
import { isMobile } from 'react-device-detect'
//import { GoLinkExternal } from 'react-icons/go'
import Page from './Page'
import Photo from './Photo'
import { fetchUnsplashPhotos } from '../utils/unsplash'

const ScrollOverPack = ScrollAnim.OverPack

const lightboxTheme = {
  arrow: {
    ':hover': { opacity: 1 },
    backgroundColor: 'rgba(255, 255, 255, .8)',
    fill: '#222',
    opacity: 0.6,
    transition: 'opacity .2s'
  },
  arrow__direction__left: {
    marginLeft: 10
  },
  arrow__direction__right: {
    marginRight: 10
  },
  arrow__size__medium: {
    '@media (min-width: 768px)': {
      height: 70,
      padding: 15
    },
    borderRadius: 40,
    height: 40,
    marginTop: -20
  },
  container: {
    background: 'rgba(255, 255, 255, .9)'
  },
  figure: {
    boxShadow: '0px 0px 50px rgba(0, 0, 0, .2)'
  },
  close: {
    ':hover': { opacity: 1 },
    fill: '#222',
    opacity: 0.6
  },
  footer: {
    color: '#222',
    marginLeft: '5px',
    marginRight: '5px'
  },
  footerCaption: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  footerCount: {
    color: '#222',
    display: 'none'
  }
}

class Photography extends Component {
  state = {
    photos: [],
    width: -1,
    currentImage: 0,
    lightboxIsOpen: false,
    delay: 150
  }

  componentDidMount() {
    scrollToComponent(this.page, { align: 'top', duration: 1 })

    fetchUnsplashPhotos().then(photos =>
      this.setState({
        photos: photos.map(p => ({
          caption: this.lightboxCaption(p),
          ...p
        }))
      })
    )
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
    //const linkString = renderToString(<a href={photo.link} target="_blank" rel="noopener noreferrer"><GoLinkExternal className="photography-link photography-link-lightbox" /></a>)
    const unsplashString = renderToString(
      <a
        className="photography-link unsplash-profile-link"
        href="https://unsplash.com/@stevenliuyi?utm_source=yliu&utm_medium=referral"
        target="_blank"
        rel="noopener noreferrer"
      >
        (my Unsplash profile)
      </a>
    )

    return `<span>${photo.description}${unsplashString}</span>`
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
              </a>
              &nbsp;under a CC0-like license which allows everyone to use them
              freely.
            </span>
          </div>
          <div className="portfolio-list">
            <Measure
              bounds
              onResize={contentRect =>
                this.setState({ width: contentRect.bounds.width })
              }
            >
              {({ measureRef }) => {
                if (width < 1) return <div ref={measureRef} />
                let columns = 1
                if (width >= 320) columns = 2
                if (width >= 750) columns = 3
                if (width >= 1200) columns = parseInt(width / 300, 10)
                return (
                  <div ref={measureRef}>
                    <Gallery
                      photos={this.state.photos}
                      ImageComponent={Photo}
                      columns={columns}
                      margin={8}
                      onClick={this.openLightbox}
                    />
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
          </div>
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Photography
