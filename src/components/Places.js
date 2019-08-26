import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import Page from './Page'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
  Lines,
  Line
} from 'react-simple-maps'
import { geoConicConformal, geoConicEqualArea, geoPath } from 'd3-geo'
import ReactTooltip from 'react-tooltip'
import { Spring, config } from 'react-spring'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import places from '../data/places.yml'
import cities from '../data/cities.yml'
import flights from '../data/flights_coord.yml'

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
    markerOffsets: [5, 10]
  }
]

class Places extends Component {
  state = {
    currentMap: 'world',
    resetSpring: false,
    delay: 150,
    showFlights: false
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

  getConfig = (config, defaultConfig) =>
    config != null ? config.split(',').map(d => parseInt(d, 10)) : defaultConfig

  getProjection = projection => {
    if (projection === 'conformalConic') {
      const conformalConicProjection = (width, height, config) =>
        geoConicConformal()
          .parallels(config.parallels)
          .rotate(config.rotation)
          .scale(config.scale)
      return conformalConicProjection
    } else if (projection === 'equalAreaConic') {
      const equalAreaConic = (width, height, config) =>
        geoConicEqualArea()
          .parallels(config.parallels)
          .rotate(config.rotation)
          .scale(config.scale)
      return equalAreaConic
    } else {
      return projection
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

  buildCurves = (start, end, line) => {
    if (this.zoomableGroup == null) return

    const projection = this.zoomableGroup.props.projection
    const path = geoPath().projection(projection)
    const pathString = path({
      type: 'LineString',
      coordinates: [line.coordinates.start, line.coordinates.end]
    })
    return pathString
  }

  handleToggleChange = e => {
    this.setState({ showFlights: !this.state.showFlights })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentMap !== prevState.currentMap)
      setTimeout(() => {
        ReactTooltip.rebuild()
      }, 100)
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)

    // cache map files
    Object.keys(places)
      .slice(1)
      .forEach(p => {
        if (!sessionStorage.hasOwnProperty(`map-${p}`))
          fetch(`maps/${places[p].filename}`)
            .then(res => res.json())
            .then(data =>
              sessionStorage.setItem(`map-${p}`, JSON.stringify(data))
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
            <span>
              This is a map marking all the places I've been on Earth. Beyond
              Earth? I also{' '}
              <a
                href="https://go.yliu.io/orion"
                target="_blank"
                rel="noopener noreferrer"
              >
                traveled
              </a>{' '}
              <a
                href="https://go.yliu.io/insight"
                target="_blank"
                rel="noopener noreferrer"
              >
                to
              </a>{' '}
              <a
                href="https://go.yliu.io/mars2020"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mars
              </a>{' '}
              three times .{' '}
              <span style={{ whiteSpace: 'nowrap' }}>ᕕ( ᐛ )ᕗ</span>
            </span>
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
                  projection={this.getProjection(places[currentMap].projection)}
                  projectionConfig={{
                    scale: places[currentMap].scale,
                    rotation: this.getConfig(places[currentMap].rotation, [
                      0,
                      0,
                      0
                    ]),
                    parallels: this.getConfig(places[currentMap].parallels, [
                      0,
                      0
                    ])
                  }}
                >
                  <ZoomableGroup
                    center={places[currentMap].center
                      .split(',')
                      .map(d => parseInt(d, 10))}
                    zoom={styles.zoom}
                    ref={el => (this.zoomableGroup = el)}
                  >
                    <Geographies
                      geography={
                        sessionStorage.hasOwnProperty(
                          `map-${places[currentMap]}`
                        )
                          ? JSON.parse(
                              sessionStorage.getItem(
                                `map-${places[currentMap]}`
                              )
                            )
                          : `maps/${places[currentMap].filename}`
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
                                  stroke: '#fff',
                                  strokeWidth: 0.5,
                                  outline: 'none'
                                },
                                hover: {
                                  fill: '#0d8aba',
                                  stroke: '#fff',
                                  strokeWidth: 0.5,
                                  outline: 'none'
                                },
                                pressed: {
                                  fill: '#0d8aba',
                                  stroke: '#fff',
                                  strokeWidth: 0.5,
                                  outline: 'none'
                                }
                              }}
                            />
                          )
                        })
                      }
                    </Geographies>
                    <Lines>
                      {styles.zoom === 1 &&
                        this.state.showFlights &&
                        flights
                          .filter(
                            flight =>
                              flight.from_region === currentMap ||
                              flight.to_region === currentMap ||
                              currentMap === 'world'
                          )
                          .map((flight, i) => (
                            <Line
                              key={i}
                              line={{
                                coordinates: {
                                  start: flight.from_coord
                                    .split(',')
                                    .map(c => parseFloat(c)),
                                  end: flight.to_coord
                                    .split(',')
                                    .map(c => parseFloat(c))
                                }
                              }}
                              style={{
                                default: {
                                  stroke: 'rgba(0, 0, 0, 0.2)',
                                  strokeWidth: 1,
                                  fill: 'none'
                                },
                                hover: {
                                  stroke: '#0d8aba',
                                  strokeWidth: 1,
                                  fill: 'none'
                                },
                                pressed: {
                                  stroke: '#0d8aba',
                                  strokeWidth: 1,
                                  fill: 'none'
                                }
                              }}
                              buildPath={this.buildCurves}
                            />
                          ))}
                    </Lines>
                    <Markers>
                      {currentMap !== 'world' &&
                        cities[currentMap] != null &&
                        cities[currentMap]
                          .map(city => ({
                            name: city.city,
                            coordinates: city.coordinates
                              .split(',')
                              .map(c => parseFloat(c))
                          }))
                          .map((city, i) => (
                            <Marker
                              key={`city-${i}`}
                              marker={city}
                              style={{
                                default: { fill: '#fff' },
                                hover: { fill: '#fff' },
                                pressed: { fill: '0fff' }
                              }}
                            >
                              <circle
                                className="places-marker"
                                cx={0}
                                cy={0}
                                r={3}
                                data-tip={city.name}
                              />
                            </Marker>
                          ))}
                    </Markers>
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
            <label className="flight-toggle-wrap">
              <Toggle
                className="flight-toggle"
                checked={this.state.showFlights}
                onChange={this.handleToggleChange}
              />
              <span> Show my flights</span>
            </label>
            <ReactTooltip type="light" />
          </div>
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Places
