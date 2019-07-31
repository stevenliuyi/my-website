import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import scrollToComponent from 'react-scroll-to-component'
import ScrollAnim from 'rc-scroll-anim'
import Gallery from 'react-photo-gallery'
import Measure from 'react-measure'
import Lightbox from 'react-images'
import { GoLinkExternal } from 'react-icons/go'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import Page from './Page'
import PortfolioWork from './PortfolioWork'
import { getImageURL } from '../utils/utils'
import portfolio from '../data/portfolio.yml'

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
    fontWeight: 'bold',
    fontVariant: 'small-caps',
    marginLeft: '5px',
    marginRight: '5px'
  },
  footerCaption: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  footerCount: {
    color: '#222'
  }
}

class Portfolio extends Component {
  state = {
    portfolio: [],
    width: -1,
    currentImage: 0,
    lightboxIsOpen: false,
    delay: 150
  }

  componentDidMount() {
    scrollToComponent(this.page, { align: 'top', duration: 1 })
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
    window.open(e.target.src.replace('f_auto/', ''), '_blank')
  }

  lightboxCaption = photo => {
    const linkString =
      photo.link == null
        ? ''
        : renderToString(
            <a href={photo.link} target="_blank" rel="noopener noreferrer">
              <GoLinkExternal className="portfolio-link portfolio-link-lightbox" />
            </a>
          )

    const infoString =
      photo.info == null
        ? ''
        : renderToString(<span className="portfolio-info">{photo.info}</span>)

    return `${photo.name}${linkString}${infoString}`
  }

  getPortfolio = () =>
    portfolio.sort((a, b) => a.name.localeCompare(b.name)).map(
      p =>
        process.env.NODE_ENV === 'development'
          ? {
              src: `/images/portfolio/${p.filename}`,
              originalWidth: p.width,
              caption: this.lightboxCaption(p),
              ...p
            }
          : {
              src: getImageURL(`portfolio/${p.filename}`, { f: 'auto' }),
              originalWidth: p.width,
              caption: this.lightboxCaption(p),
              ...p
            }
    )

  render() {
    const width = this.state.width

    return (
      <ScrollOverPack scale={0.5} always={false}>
        <Page
          ref={el => (this.page = el)}
          title="PORTFOLIO"
          quote="Creativity takes courage."
          author="Henri Matisse"
          backgroundFilename="plush-design-studio-483666-unsplash"
          delay={this.state.delay}
          {...this.props}
        >
          <div className="cover-text">
            <span>
              This portfolio displays some of my sketches, drawings and designs.
              It is still under construction. For my photographs, check out{' '}
              <Link to="photos">here</Link>.
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
                      photos={this.getPortfolio()}
                      ImageComponent={PortfolioWork}
                      columns={columns}
                      margin={8}
                      onClick={this.openLightbox}
                    />
                  </div>
                )
              }}
            </Measure>
            <Lightbox
              images={this.getPortfolio()}
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

export default Portfolio
