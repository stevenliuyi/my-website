export const fetchUnsplashPhotos = function() {
  return fetch(
    `https://api.unsplash.com/users/stevenliuyi/photos?per_page=100&order_by=popular`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      }
    }
  )
    .then(res => res.json())
    .then(photos =>
      photos.map(p => ({
        src: p.urls.full,
        src_small: p.urls.regular,
        description: p.description,
        link: p.links.html,
        width: p.width,
        height: p.height
      }))
    )
    .catch(err => {
      console.log(err)
      return null
    })
}
