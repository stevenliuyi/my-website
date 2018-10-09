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

// get image URL
export const getImageURL = (path, options) => {
  const options_str = Object.keys(options)
    .map(
      o =>
        `${o}_${
          typeof options[o] === 'number' ? parseInt(options[o]) : options[o]
        }`
    )
    .join()
  return `/images/${options_str}/${path}`
}
