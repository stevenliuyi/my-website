export const fetchUnsplashPhotos = function() {
  return fetch(
    `https://api.unsplash.com/users/stevenliuyi/photos?per_page=100&order_by=popular`,
    {
      headers: {
        Authorization:
          'Client-ID e9270d7d6548e2e3c21ca415ad6a3d0522d2b5da885e380a814d1a40b7c29a5a'
      }
    }
  )
    .then(res => res.json())
    .then(photos =>
      photos.map(p => ({
        src: p.urls.regular,
        src_full: p.urls.full,
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
