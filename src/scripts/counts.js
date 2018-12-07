const yaml = require('js-yaml')
const fs = require('fs')
const fetch = require('node-fetch')

function fetchGithubCount() {
  return fetch('https://api.github.com/user/repos?per_page=100', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })
    .then(res => res.json())
    .then(data => data.length)
}

function writeCounts(read, portfolio, github) {
  const text = `read: ${read}\r\nportfolio: ${portfolio}\r\ngithub: ${github}`
  const filename = 'src/data/counts.yml'
  fs.writeFile(filename, text, function(e) {
    if (e) {
      console.log(e)
    } else {
      console.log(`file ${filename} was saved`)
    }
  })
}

try {
  const readingList = yaml.safeLoad(
    fs.readFileSync('src/data/read.yml', 'utf8')
  )
  const portfolioList = yaml.safeLoad(
    fs.readFileSync('src/data/portfolio.yml', 'utf8')
  )

  const readingListCount = readingList.length
  const portfolioCount = portfolioList.length

  fetchGithubCount().then(githubCount =>
    writeCounts(readingListCount, portfolioCount, githubCount)
  )
} catch (e) {
  console.log(e)
}
