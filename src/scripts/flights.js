const fs = require('fs')
const yaml = require('js-yaml')
const api = require('./api')

try {
  let flights = yaml.safeLoad(fs.readFileSync('src/data/flights.yml', 'utf8'))
  // obtain all airport codes
  const airports = [
    ...new Set([...flights.map(a => a.from), ...flights.map(a => a.to)])
  ]

  let promises = []
  let coordinates = {}

  airports.forEach(code => {
    promises.push(
      api
        .fetchAirportLocation(code)
        .then(data => data.value.slice(6, -1).replace(' ', ', '))
        .then(coord => (coordinates[code] = coord))
    )
  })

  Promise.all(promises).then(() => {
    flights.forEach(flight => {
      flight['from_coord'] = coordinates[flight.from]
      flight['to_coord'] = coordinates[flight.to]
    })
    const filename = 'src/data/flights_coord.yml'
    fs.writeFile(filename, yaml.safeDump(flights), function(e) {
      if (e) {
        console.log(e)
      } else {
        console.log(`file ${filename} was saved`)
      }
    })
  })
} catch (e) {
  console.log(e)
}
