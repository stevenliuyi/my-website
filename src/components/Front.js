import React, { Component } from 'react'
import ProgressiveImage from 'react-progressive-image-loading'
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'
import { TiCode } from 'react-icons/ti'
import { IoIosArrowDown } from 'react-icons/io'
import { isMobileOnly } from 'react-device-detect'
import { getImageURL } from '../utils/utils'

class Front extends Component {
  state = {
    linkShown: false,
    backgroundLoaded: false
  }

  // reference: https://codepen.io/tmrDevelops/pen/PPgjwz
  snowy() {
    const canvas = document.getElementById('snow')
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    window.addEventListener(
      'resize',
      () => {
        canvas.width = width = window.innerWidth
        canvas.height = height = window.innerHeight
      },
      false
    )

    let snow,
      arr = []
    const num = 100,
      tsc = 1,
      sp = 0.2
    const sc = 1.3,
      mv = 20,
      min = 1

    // initialization
    for (let i = 0; i < num; ++i) {
      snow = new flake()
      snow.y = Math.random() * (height + 50)
      snow.x = Math.random() * width
      snow.t = Math.random() * (Math.PI * 2)
      snow.sz = (100 / (10 + Math.random() * 100)) * sc
      snow.sp = Math.pow(snow.sz * 0.8, 2) * 0.15 * sp
      snow.sp = snow.sp < min ? min : snow.sp
      arr.push(snow)
    }

    // intialize timer
    const fps = 24
    const fpsInterval = 1000 / fps
    let then = Date.now(),
      now,
      elapsed

    // start animation
    animate()

    function animate() {
      window.requestAnimationFrame(animate)

      // calculate elapsed time
      now = Date.now()
      elapsed = now - then

      // only draw when enough time has elapsed
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval)

        ctx.clearRect(0, 0, width, height)

        for (let i = 0; i < arr.length; ++i) {
          let f = arr[i]
          f.t += 0.05
          f.t = f.t >= Math.PI * 2 ? 0 : f.t
          f.y += f.sp
          f.x += Math.sin(f.t * tsc) * (f.sz * 0.3) * Math.random()
          if (f.y > height + 50) f.y = -10 - Math.random() * mv
          if (f.x > width + mv) f.x = -mv
          if (f.x < -mv) f.x = width + mv
          f.draw()
        }
      }
    }

    function flake() {
      this.draw = function() {
        this.g = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.sz
        )
        this.g.addColorStop(0, 'hsla(255,255%,255%,1)')
        this.g.addColorStop(1, 'hsla(255,255%,255%,0)')
        ctx.moveTo(this.x, this.y)
        ctx.fillStyle = this.g
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true)
        ctx.fill()
      }
    }
  }

  handleScroll = e => {
    const ratio = 1
    const maxBlur = 20
    const scrollTop =
      document.documentElement.scrollTop || document.scrollingElement.scrollTop
    const opacity =
      scrollTop > ratio * window.innerHeight
        ? 0
        : 1 - scrollTop / window.innerHeight / ratio
    const blur =
      scrollTop > ratio * window.innerHeight
        ? maxBlur
        : (scrollTop / window.innerHeight / ratio) * maxBlur
    const background = document.querySelector('.background')
    if (background == null) return
    background.style.opacity = opacity
    background.style.filter = `blur(${blur}px)`
    background.style.WebkitFilter = `blur(${blur}px)`
  }

  componentDidMount() {
    // no animation on cell phones due to performance issue
    if (!isMobileOnly) this.snowy()

    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate({ linkShown }) {
    if (!linkShown && this.state.linkShown) {
      ;['main-links', 'more-text', 'arrow-down'].forEach(showClass => {
        let elem = document.querySelector(`.${showClass}`)
        elem.style.opacity = 1
        elem.style.transform = 'translate(-50%, 0)'
        if (showClass === 'arrow-down') {
          const animation = 'arrow-down-flash linear 1.5s infinite'
          elem.style.animation = animation
          elem.style.WebkitAnimation = animation
        }
      })
    }
  }

  render() {
    return (
      <div>
        <div className="background">
          <canvas id="snow" />
          <ProgressiveImage
            preview={getImageURL('fabrice-villard-584622-unsplash.jpg', {
              f: 'auto',
              c: 'scale',
              w: 500
            })}
            src={getImageURL('fabrice-villard-584622-unsplash.jpg', {
              f: 'auto',
              c: 'fill',
              w: window.innerWidth * window.devicePixelRatio,
              h: window.innerHeight * window.devicePixelRatio
            })}
            render={(src, style) => (
              <div
                className="background-image"
                style={Object.assign(style, { backgroundImage: `url(${src})` })}
              />
            )}
            onLoaded={() => this.setState({ backgroundLoaded: true })}
          />
          {this.state.backgroundLoaded && (
            <div>
              <Typist
                className="title noselect"
                startDelay={1200}
                avgTypingDelay={100}
                onCharacterTyped={() => {
                  if (!this.state.linkShown) this.setState({ linkShown: true })
                }}
              >
                <span>hi, I'm Yi Liu</span>
                <Typist.Backspace count={6} delay={1000} />
                <span>Steven.</span>
              </Typist>
              <div className="main-links noselect">
                <a href="https://github.com/stevenliuyi">
                  <span className="main-link">
                    <TiCode size={14} className="main-icon" />
                    <span className="main-link-text">github</span>
                  </span>
                </a>
              </div>
            </div>
          )}
          <div className="more-text noselect" onClick={this.props.scrollToNav}>
            more
          </div>
          <div className="arrow-down" onClick={this.props.scrollToNav}>
            <IoIosArrowDown size={24} />
          </div>
        </div>
        <div className="background-empty" />
      </div>
    )
  }
}

export default Front
