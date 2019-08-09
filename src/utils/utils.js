import { fetchUnsplash } from './unsplash'

// set vh-related css styles
export const setVhs = (isHomepage = true) => {
  const vh = window.innerHeight

  if (isHomepage) {
    const background = document.querySelector('.background')
    const backgroundEmpty = document.querySelector('.background-empty')
    const backgroundImage = document.querySelector('.background-image')
    const title = document.querySelector('.title')
    const mainLinks = document.querySelector('.main-links')

    if (background != null) background.style.height = `${vh}px`
    if (backgroundEmpty != null) backgroundEmpty.style.height = `${vh}px`
    if (backgroundImage != null) backgroundImage.style.height = `${vh}px`
    if (title != null) title.style.top = `${vh * 0.6}px`
    if (mainLinks != null) mainLinks.style.top = `${vh * 0.6}px`
  } else {
    const cover = document.querySelector('.cover')
    const coverImage = document.querySelector('.cover-image')

    if (cover != null) cover.style.height = `${vh}px`
    if (coverImage != null) coverImage.style.height = `${vh}px`
  }
}

// get number of blog posts
export const getBlogCount = () =>
  fetch('https://blog.yliu.io/post-count')
    .then(data => data.text())
    .catch(err => 0)

// get number of photos
export const getPhotoCount = () =>
  fetchUnsplash()
    .then(photos => photos.length.toString())
    .catch(err => 0)

// get image URL
export const getImageURL = (path, options) => {
  if (process.env.REACT_APP_IPFS === 'true') return `images/${path}`
  const options_str = Object.keys(options)
    .map(
      o =>
        `${o}_${
          typeof options[o] === 'number'
            ? options[o] < 1
              ? parseFloat(options[o]).toFixed(1)
              : parseInt(options[o], 10)
            : options[o]
        }`
    )
    .join()
  return `https://yliu.io/images/${options_str}/${path}`
}

// Google Anaylsis
export const gaConfig = () => {
  const gtag = window.gtag
  if (typeof gtag === 'function') {
    gtag('config', 'UA-127965994-1', {
      page_location: window.location.href,
      page_path: window.location.pathname
    })
  }
}
