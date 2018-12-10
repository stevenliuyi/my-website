import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import ScrollAnim from 'rc-scroll-anim'
import Page from './Page'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import places from '../data/places.yml'

const ScrollOverPack = ScrollAnim.OverPack

const markers = [
  {
    name: 'Shanghai',
    info: 'my hometown',
    coordinates: [121.4667, 31.1667],
    markerOffsets: [5, 10]
  },
  {
    name: 'South Bend',
    info: 'my current location',
    coordinates: [-86.25023, 41.6764],
    markerOffsets: [5, 5]
  }
]

class Places extends Component {
  state = {
    delay: 150
  }

  isVisited = (map, id) => {
    return places.find(el => el.map === map).places.includes(id)
  }

  componentDidMount() {
    scrollToComponent(this.page, { align: 'top', duration: 1 })
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  render() {
    return (
      <ScrollOverPack scale={0.5} always={false}>
        <Page
          ref={el => (this.page = el)}
          title="PLACES"
          quote="Travel is fatal to prejudice, bigotry and narrow-mindedness."
          author="Mark Twain"
          backgroundFilename="adrian-226109-unsplash"
          delay={this.state.delay}
          {...this.props}
        >
          <div className="cover-text">
            This is a map marking all the places I've been.
          </div>
          <div className="places-map-wrap">
            <ComposableMap
              className="places-map"
              projectionConfig={{
                scale: 160,
                rotation: [-11, 0, 0],
                xOffset: -10,
                yOffset: 10
              }}
            >
              <ZoomableGroup>
                <Geographies geography="/maps/world-50m.json">
                  {(geographies, projection) =>
                    geographies.map(
                      (geography, i) =>
                        geography.id !== 'ATA' && (
                          <Geography
                            key={i}
                            data-tip={geography.properties.name}
                            geography={geography}
                            projection={projection}
                            style={{
                              default: {
                                fill: this.isVisited('world', geography.id)
                                  ? '#aaa'
                                  : '#eee',
                                stroke: '#aaa',
                                strokeWidth: 0.5,
                                outline: 'none'
                              },
                              hover: {
                                fill: '#aaa',
                                stroke: '#aaa',
                                strokeWidth: 0.5,
                                outline: 'none'
                              },
                              pressed: {
                                fill: '#0d8aba',
                                stroke: '#aaa',
                                strokeWidth: 0.5,
                                outline: 'none'
                              }
                            }}
                          />
                        )
                    )
                  }
                </Geographies>
                <Markers>
                  {markers.map((marker, i) => (
                    <Marker
                      key={i}
                      marker={marker}
                      style={{
                        default: { fill: '#0d8aba' },
                        hover: { fill: '#fff' },
                        pressed: { fill: '0d8aba' }
                      }}
                    >
                      <circle cx={0} cy={0} r={3} className="places-marker" />
                      <text
                        textAnchor="start"
                        x={marker.markerOffsets[0]}
                        y={marker.markerOffsets[1]}
                        className="places-marker-text"
                      >
                        {marker.name}
                      </text>
                      <text
                        textAnchor="start"
                        x={marker.markerOffsets[0]}
                        y={marker.markerOffsets[1] + 8}
                        className="places-marker-info"
                      >
                        {marker.info}
                      </text>
                    </Marker>
                  ))}
                </Markers>
              </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip type="light" />
          </div>
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Places
