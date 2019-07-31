// compute number of gallery columns based on width
export const numOfColumns = width => {
  let columns = 1
  if (width >= 320) columns = 2
  if (width >= 750) columns = 3
  if (width >= 1200) columns = parseInt(width / 300, 10)

  return columns
}

export const lightboxTheme = {
  arrow: {
    ':hover': { opacity: 1 },
    backgroundColor: 'rgba(255, 255, 255, .8)',
    fill: '#222',
    opacity: 0.6,
    transition: 'opacity .2s'
  },
  arrow__direction__left: {
    marginLeft: 10
  },
  arrow__direction__right: {
    marginRight: 10
  },
  arrow__size__medium: {
    '@media (min-width: 768px)': {
      height: 70,
      padding: 15
    },
    borderRadius: 40,
    height: 40,
    marginTop: -20
  },
  container: {
    background: 'rgba(255, 255, 255, .9)'
  },
  figure: {
    boxShadow: '0px 0px 50px rgba(0, 0, 0, .2)'
  },
  close: {
    ':hover': { opacity: 1 },
    fill: '#222',
    opacity: 0.6
  },
  footer: {
    color: '#222',
    marginLeft: '5px',
    marginRight: '5px'
  },
  footerCaption: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  footerCount: {
    color: '#222',
    display: 'none'
  }
}
