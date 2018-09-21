export const setVhs = () => {
  const vh = window.innerHeight
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
}
