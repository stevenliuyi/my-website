export const fetchUnsplash = function(requestString = '') {
  return fetch(`https://api.unsplash.com/users/stevenliuyi/${requestString}`, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    }
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })
}

export const fetchUnsplashPhotos = function(page = 1) {
  return fetchUnsplash(`photos?order_by=popular&per_page=30&page=${page}`).then(
    photos =>
      photos.map(p => ({
        id: p.id,
        src: `${p.urls.raw}&w=${window.innerWidth}&h=${window.innerHeight}&dpr=${window.devicePixelRatio}&fit=max&q=80&auto=format`,
        src_small: `${p.urls.raw}&h=300&dpr=${window.devicePixelRatio}&fit=max&q=80&auto=format`,
        description: p.description,
        link: p.links.html,
        download_link: `${p.urls.raw}&dl=yi-liu-${p.id}-unsplash.jpg`,
        download_location: p.links.download_location,
        width: p.width,
        height: p.height
      }))
  )
}

export const triggerUnsplashDownload = function(downloadLocation) {
  return fetch(downloadLocation, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    }
  }).catch(err => {
    console.log(err)
    return null
  })
}
