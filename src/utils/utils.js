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
  fetch('https://cors-anywhere.herokuapp.com/https://blog.yliu.io/post-count')
    .then(data => data.text())
    .catch(err => 0)
