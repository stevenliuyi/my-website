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
import { lightboxTheme, numOfColumns } from '../utils/gallery'
import portfolio from '../data/portfolio.yml'

const ScrollOverPack = ScrollAnim.OverPack

const portfolioLightboxTheme = {
  ...lightboxTheme,
  footer: {
    ...lightboxTheme.footer,
    fontWeight: 'bold',
    fontVariant: 'small-caps'
  },
  footerCaption: {
    display: 'inline-flex',
    alignItems: 'center'
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
    portfolio
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(p =>
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
                return (
                  <div ref={measureRef}>
                    <Gallery
                      photos={this.getPortfolio()}
                      ImageComponent={PortfolioWork}
                      columns={numOfColumns(width)}
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
              theme={portfolioLightboxTheme}
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
