const yaml = require('js-yaml')
const fs = require('fs')

try {
  const readingList = yaml.safeLoad(
    fs.readFileSync('src/data/read.yml', 'utf8')
  )
  const portfolioList = yaml.safeLoad(
    fs.readFileSync('src/data/portfolio.yml', 'utf8')
  )

  const readingListCount = readingList.length
  const portfolioCount = portfolioList.length

  const text = `read: ${readingListCount}\r\nportfolio: ${portfolioCount}`
  const filename = 'src/data/counts.yml'
  fs.writeFile(filename, text, function(e) {
    if (e) {
      console.log(e)
    } else {
      console.log(`file ${filename} was saved`)
    }
  })
} catch (e) {
  console.log(e)
}
