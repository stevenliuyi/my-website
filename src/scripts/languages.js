const fs = require('fs')
const api = require('./api')

function writeLanguageCounts(languages) {
  const text = Object.keys(languages)
    .sort((a, b) => a.localeCompare(b))
    .map(
      lang =>
        `- language: ${
          lang.startsWith('Jupyter') ? 'Jupyter' : lang
        }\r\n  bytes: ${languages[lang]}\r\n`
    )
    .join('\r\n')
  const filename = 'src/data/languages.yml'
  fs.writeFile(filename, text, function(e) {
    if (e) {
      console.log(e)
    } else {
      console.log(`file ${filename} was saved`)
    }
  })
}

try {
  let all_languages = {}
  let promises = []

  api.fetchGithub('user/repos').then(data => {
    data.forEach(repo => {
      promises.push(
        api.fetchGithubLanguages(repo.name).then(languages => {
          Object.keys(languages).forEach(lang => {
            if (lang in all_languages) {
              all_languages[lang] += languages[lang]
            } else {
              all_languages[lang] = languages[lang]
            }
          })
        })
      )
    })

    Promise.all(promises).then(() => writeLanguageCounts(all_languages))
  })
} catch (e) {
  console.log(e)
}
