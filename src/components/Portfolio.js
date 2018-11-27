import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import ScrollAnim from 'rc-scroll-anim'
import Gallery from 'react-photo-gallery'
import Measure from 'react-measure'
import Lightbox from 'react-images'
import Page from './Page'
import PortfolioWork from './PortfolioWork'

const ScrollOverPack = ScrollAnim.OverPack

const lightboxTheme = {
  arrow: {
    ':hover': { opacity: 1 },
    backgroundColor: 'rgba(255, 255, 255, .8)',
    fill: '#222',
    opacity: 0.6,
    transition: 'opacity .2s'
  },
  arrow__direction_left: {
    marginLeft: 10
  },
  arrow__direction_right: {
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
    fontWeight: 'bold'
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
    // dynamically import list
    import('../data/portfolio.yml')
      .then(m => m.default)
      .then(data => this.setState({ portfolio: data }))

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

  getPortfolio = () =>
    this.state.portfolio
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(p => ({
        src: `/images/portfolio/${p.filename}`,
        caption: p.name,
        ...p
      }))

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
          onTitleClick={() => this.setState({ currentIdx: -1 })}
          delay={this.state.delay}
          {...this.props}
        >
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
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
              theme={lightboxTheme}
            />
          </div>
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Portfolio
