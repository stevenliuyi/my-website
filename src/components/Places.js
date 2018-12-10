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
import { Spring, config } from 'react-spring'

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
    info: 'where I currently live',
    coordinates: [-86.25023, 41.6764],
    markerOffsets: [5, 5]
  }
]

class Places extends Component {
  state = {
    currentMap: 'world',
    resetSpring: false,
    delay: 150
  }

  isVisited = abbr => {
    // Chinese political correctness
    if (['HKG', 'TWN'].includes(abbr)) return true

    return places[this.state.currentMap].places.includes(abbr)
  }

  switchPaths = id => {
    if (this.state.currentMap === 'world') {
      if (Object.keys(places).includes(id))
        this.setState({ currentMap: id, resetSpring: true })
      // Chinese political correctness
      if (['HKG', 'TWN'].includes(id))
        this.setState({ currentMap: 'CHN', resetSpring: true })
    } else {
      this.setState({ currentMap: 'world', resetSpring: true })
    }
  }

  handleMouseEnter = id => {
    // Chinese political correctness
    if (['CHN', 'HKG', 'TWN'].includes(id)) {
      ;['China', 'Hong Kong', 'Taiwan'].forEach(pl => {
        const el = document.getElementById(`world-${pl}`)
        if (el != null) el.classList.add('places-geo-hover')
      })
    }
  }

  handleMouseLeave = id => {
    if (['CHN', 'HKG', 'TWN'].includes(id)) {
      ;['China', 'Hong Kong', 'Taiwan'].forEach(pl => {
        const el = document.getElementById(`world-${pl}`)
        if (el != null) el.classList.remove('places-geo-hover')
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentMap !== prevState.currentMap)
      setTimeout(() => {
        ReactTooltip.rebuild()
      }, 100)
  }

  componentDidMount() {
    scrollToComponent(this.page, { align: 'top', duration: 1 })
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  render() {
    const currentMap = this.state.currentMap
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
            <Spring
              from={{ zoom: currentMap === 'world' ? 2 : 0.5 }}
              to={{ zoom: 1 }}
              config={config.stiff}
              delay={100}
              reset={this.state.resetSpring}
              onStart={() => this.setState({ resetSpring: false })}
            >
              {styles => (
                <ComposableMap
                  className="places-map"
                  projection={currentMap === 'world' ? 'times' : 'mercator'}
                  projectionConfig={{
                    scale: places[currentMap].scale,
                    rotation:
                      places[currentMap].rotation != null
                        ? places[currentMap].rotation
                            .split(',')
                            .map(d => parseInt(d, 10))
                        : [0, 0, 0]
                  }}
                >
                  <ZoomableGroup
                    center={places[currentMap].center
                      .split(',')
                      .map(d => parseInt(d, 10))}
                    zoom={styles.zoom}
                  >
                    <Geographies
                      geography={`/maps/${places[currentMap].filename}`}
                      disableOptimization
                    >
                      {(geographies, projection) =>
                        geographies.map(
                          (geography, i) =>
                            geography.id !== 'ATA' && (
                              <Geography
                                className={
                                  currentMap !== 'world' ||
                                  Object.keys(places).includes(geography.id) ||
                                  ['HKG', 'TWN'].includes(geography.id)
                                    ? 'places-geo-pointer'
                                    : ''
                                }
                                key={i}
                                id={`${currentMap}-${
                                  geography.properties[
                                    places[currentMap].name_key
                                  ]
                                }`}
                                cacheId={`${currentMap}-${
                                  geography.properties[
                                    places[currentMap].name_key
                                  ]
                                }`}
                                data-tip={
                                  // Chinese political correctness
                                  currentMap === 'world' &&
                                  ['Hong Kong', 'Taiwan'].includes(
                                    geography.properties[
                                      places[currentMap].name_key
                                    ]
                                  )
                                    ? 'China'
                                    : geography.properties[
                                        places[currentMap].name_key
                                      ]
                                }
                                geography={geography}
                                projection={projection}
                                onClick={() => this.switchPaths(geography.id)}
                                onMouseEnter={() =>
                                  this.handleMouseEnter(geography.id)
                                }
                                onMouseLeave={() =>
                                  this.handleMouseLeave(geography.id)
                                }
                                style={{
                                  default: {
                                    fill: this.isVisited(
                                      currentMap === 'world'
                                        ? geography.id
                                        : geography.properties[
                                            places[currentMap].abbr_key
                                          ]
                                    )
                                      ? '#aaa'
                                      : '#eee',
                                    stroke: '#aaa',
                                    strokeWidth: 0.5,
                                    outline: 'none'
                                  },
                                  hover: {
                                    fill: '#0d8aba',
                                    stroke: '#0d8aba',
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
                          <circle
                            cx={0}
                            cy={0}
                            r={3}
                            className="places-marker"
                          />
                          <text
                            textAnchor="start"
                            x={marker.markerOffsets[0]}
                            y={marker.markerOffsets[1]}
                            className="places-marker-text noselect"
                          >
                            {marker.name}
                          </text>
                          <text
                            textAnchor="start"
                            x={marker.markerOffsets[0]}
                            y={marker.markerOffsets[1] + 8}
                            className="places-marker-info noselect"
                          >
                            {marker.info}
                          </text>
                        </Marker>
                      ))}
                    </Markers>
                  </ZoomableGroup>
                </ComposableMap>
              )}
            </Spring>
            <ReactTooltip type="light" />
          </div>
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Places
