const yaml = require('js-yaml')
const fs = require('fs')

try {
  const readingList = yaml.safeLoad(
    fs.readFileSync('src/data/read.yml', 'utf8')
  )
  const count = readingList.length
  const filename = 'src/data/read-count.yml'
  fs.writeFile(filename, `count: ${count}`, function(e) {
    if (e) {
      console.log(e)
    } else {
      console.log(`file ${filename} was saved`)
    }
  })
} catch (e) {
  console.log(e)
}
