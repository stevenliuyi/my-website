const fetch = require('node-fetch')

module.exports = {
  fetchGithub: function(api) {
    return fetch(`https://api.github.com/${api}?per_page=100`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    }).then(res => res.json())
  },

  fetchGithubCount: function() {
    return this.fetchGithub('user/repos').then(data => data.length)
  },

  fetchGithubLanguages: function(repo) {
    return this.fetchGithub(`repos/stevenliuyi/${repo}/languages`).then(
      data => (data.message == null ? data : {})
    )
  }
}
