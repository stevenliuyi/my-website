const yaml = require('js-yaml')
const fs = require('fs')
const api = require('./api')

function writeCounts(read, portfolio, github, commits) {
  const text = `read: ${read}\r\nportfolio: ${portfolio}\r\ngithub: ${github}\r\ncommits: ${commits}`
  const filename = 'src/data/counts.yml'
  fs.writeFile(filename, text, function (e) {
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

  let githubCommitCount = 0
  let promises = []
  api.fetchGithub('user/repos').then((data) => {
    const ignore_repos = ['void']
    data.forEach((repo) => {
      console.log(repo.name)
      if (!ignore_repos.includes(repo.name)) {
        promises.push(
          api.fetchGithubCommitCount(repo.name).then((count) => {
            if (count > 0) githubCommitCount += count
          })
        )
      }
    })

    let githubRepoCount = 0
    promises.push(
      api.fetchGithubCount().then((count) => (githubRepoCount = count))
    )

    Promise.all(promises).then(() =>
      writeCounts(
        readingListCount,
        portfolioCount,
        githubRepoCount,
        githubCommitCount
      )
    )
  })
} catch (e) {
  console.log(e)
}
