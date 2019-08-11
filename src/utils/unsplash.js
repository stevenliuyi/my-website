export const fetchUnsplash = function() {
  return fetch(
    `https://api.unsplash.com/users/stevenliuyi/photos?per_page=100&order_by=popular`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      }
    }
  )
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })
}
export const fetchUnsplashPhotos = function() {
  return fetchUnsplash()
    .then(photos =>
      photos.map(p => ({
        src: `${p.urls.raw}&w=${window.innerWidth}&h=${window.innerHeight}&dpr=${window.devicePixelRatio}&fit=max&q=80&auto=format`,
        src_small: `${p.urls.raw}&h=300&dpr=${window.devicePixelRatio}&fit=max&q=80&auto=format`,
        description: p.description,
        link: p.links.html,
        download_link: p.links.download,
        width: p.width,
        height: p.height
      }))
    )
    .catch(err => {
      console.log(err)
      return null
    })
}
