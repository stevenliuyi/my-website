import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import ScrollAnim from 'rc-scroll-anim'
import Gallery from 'react-photo-gallery'
import Measure from 'react-measure'
import Page from './Page'
import PortfolioWork from './PortfolioWork'

const ScrollOverPack = ScrollAnim.OverPack

class Portfolio extends Component {
  state = {
    portfolio: [],
    width: -1,
    delay: 150
  }

  componentDidMount() {
    // dynamically import list
    import('../data/portfolio.yml')
      .then(m => m.default)
      .then(data => this.setState({ portfolio: data }))

    scrollToComponent(this.page, { align: 'top', duration: 1 })
  }

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
                      photos={this.state.portfolio
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(p => ({
                          src: `/images/portfolio/${p.filename}`,
                          ...p
                        }))}
                      ImageComponent={PortfolioWork}
                      columns={columns}
                      margin={8}
                    />
                  </div>
                )
              }}
            </Measure>
          </div>
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Portfolio
