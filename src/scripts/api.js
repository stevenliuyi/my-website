const fetch = require('node-fetch')

module.exports = {
  fetchGithub: function(api, returnLink = false, page = 1) {
    return fetch(`https://api.github.com/${api}?per_page=100&page=${page}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    }).then(res => {
      const link = res.headers.get('Link')
      return !returnLink ? res.json() : link
    })
  },

  fetchGithubCount: function() {
    return this.fetchGithub('user/repos').then(data => data.length)
  },

  fetchGithubLanguages: function(repo) {
    return this.fetchGithub(`repos/stevenliuyi/${repo}/languages`).then(
      data => (data.message == null ? data : {})
    )
  },

  fetchGithubCommitCountSinglePage: function(repo, page = 1, prevCount = 0) {
    return this.fetchGithub(
      `repos/stevenliuyi/${repo}/commits`,
      false,
      page
    ).then(
      data =>
        (Array.isArray(data)
          ? data.filter(
              d => d.author != null && d.author.login === 'stevenliuyi'
            ).length
          : 0) + prevCount
    )
  },

  fetchGithubCommitCount: function(repo) {
    return this.fetchGithub(`repos/stevenliuyi/${repo}/commits`, true).then(
      link => {
        if (link == null) {
          // only one page
          return this.fetchGithubCommitCountSinglePage(repo, 1)
        } else {
          // more than one page
          const matches = link.match(/=\d+>/g)
          const lastPage = parseInt(matches[1].slice(1, -1), 10)
          let promise = this.fetchGithubCommitCountSinglePage(repo, 1, 0)
          for (let p = 2; p <= lastPage; p++) {
            promise = promise.then(count =>
              this.fetchGithubCommitCountSinglePage(repo, p, count)
            )
          }
          return promise
        }
      }
    )
  }
}
