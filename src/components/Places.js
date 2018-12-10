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
    id: 'shanghai',
    info: 'my hometown',
    coordinates: [121.4667, 31.1667],
    markerOffsets: [5, 10]
  },
  {
    name: 'South Bend',
    id: 'southbend',
    info: 'where I currently live',
    coordinates: [-86.25023, 41.6764],
    markerOffsets: [6, 0]
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

  switchPaths = abbr => {
    if (this.state.currentMap === 'world') {
      if (Object.keys(places).includes(abbr)) {
        this.setState({ currentMap: abbr, resetSpring: true })
        this.markersHoverEffect(abbr, false)
      }
      // Chinese political correctness
      if (['HKG', 'TWN'].includes(abbr)) {
        this.setState({ currentMap: 'CHN', resetSpring: true })
        this.markersHoverEffect(abbr, false)
      }
    } else {
      this.setState({ currentMap: 'world', resetSpring: true })
      this.markersHoverEffect(abbr, false)
    }
  }

  markersHoverEffect = (abbr, enter) => {
    let elements = []
    if (['CHN', 'HKG', 'TWN', 'Shanghai'].includes(abbr)) {
      const el = document.getElementById('marker-shanghai')
      elements.push(el)
    }
    if (['USA', 'MI', 'IN'].includes(abbr)) {
      const el = document.getElementById('marker-southbend')
      elements.push(el)
    }
    elements.forEach(el => {
      if (el != null && enter) el.classList.add('place-marker-hover')
      if (el != null && !enter) el.classList.remove('place-marker-hover')
    })
  }

  handleMouseEnter = abbr => {
    // Chinese political correctness
    if (['CHN', 'HKG', 'TWN'].includes(abbr)) {
      ;['China', 'Hong Kong', 'Taiwan'].forEach(pl => {
        const el = document.getElementById(`world-${pl}`)
        if (el != null) el.classList.add('places-geo-hover')
      })
    }

    this.markersHoverEffect(abbr, true)
  }

  handleMouseLeave = abbr => {
    if (['CHN', 'HKG', 'TWN'].includes(abbr)) {
      ;['China', 'Hong Kong', 'Taiwan'].forEach(pl => {
        const el = document.getElementById(`world-${pl}`)
        if (el != null) el.classList.remove('places-geo-hover')
      })
    }

    this.markersHoverEffect(abbr, false)
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

    // cache map files
    Object.keys(places)
      .slice(1)
      .forEach(p => {
        if (!localStorage.hasOwnProperty(`map-${p}`))
          fetch(`/maps/${places[p].filename}`)
            .then(res => res.json())
            .then(data =>
              localStorage.setItem(`map-${p}`, JSON.stringify(data))
            )
            .catch(error => {})
      })
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
              reset={this.state.resetSpring}
              onStart={() => this.setState({ resetSpring: false })}
              duration={500}
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
                      geography={
                        localStorage.hasOwnProperty(`map-${places[currentMap]}`)
                          ? JSON.parse(
                              localStorage.getItem(`map-${places[currentMap]}`)
                            )
                          : `/maps/${places[currentMap].filename}`
                      }
                      disableOptimization
                    >
                      {(geographies, projection) =>
                        geographies.map((geography, i) => {
                          const abbr =
                            currentMap === 'world'
                              ? geography.id
                              : geography.properties[
                                  places[currentMap].abbr_key
                                ]
                          const name =
                            geography.properties[places[currentMap].name_key]
                          if (abbr === 'ATA') return <div key="none" />

                          return (
                            <Geography
                              className={
                                currentMap !== 'world' ||
                                Object.keys(places).includes(abbr) ||
                                ['HKG', 'TWN'].includes(abbr)
                                  ? 'places-geo-pointer'
                                  : ''
                              }
                              key={i}
                              id={`${currentMap}-${name}`}
                              cacheId={`${currentMap}-${name}`}
                              data-tip={
                                // Chinese political correctness
                                currentMap === 'world' &&
                                ['Hong Kong', 'Taiwan'].includes(name)
                                  ? 'China'
                                  : name
                              }
                              geography={geography}
                              projection={projection}
                              onClick={() => this.switchPaths(abbr)}
                              onMouseEnter={() => this.handleMouseEnter(abbr)}
                              onMouseLeave={() => this.handleMouseLeave(abbr)}
                              style={{
                                default: {
                                  fill: this.isVisited(abbr) ? '#aaa' : '#eee',
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
                        })
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
                            id={`marker-${marker.id}`}
                            className="places-marker"
                            cx={0}
                            cy={0}
                            r={3}
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
