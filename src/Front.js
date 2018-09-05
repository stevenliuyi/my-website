import React, { Component } from 'react';
import ProgressiveImage from 'react-progressive-image-loading'
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'
import { TiPencil, TiCode } from 'react-icons/ti'
import { IoIosArrowDown } from 'react-icons/io'

class Front extends Component {

  state = {
    linkShown: false
  }

  // reference: https://codepen.io/tmrDevelops/pen/PPgjwz
  snowy() {
    const canvas = document.getElementById('snow')
    const ctx = canvas.getContext('2d')
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    window.addEventListener('resize', () => {
      canvas.width = width = window.innerWidth
      canvas.height = height = window.innerHeight
    }, false)

    let snow, arr = []
    const num = 100, tsc = 1, sp = .2
    const sc = 1.3, mv = 20, min = 1
  
    // initialization
    for (let i = 0; i < num; ++i) {
      snow = new flake()
      snow.y = Math.random() * (height + 50)
      snow.x = Math.random() * width
      snow.t = Math.random() * (Math.PI * 2)
      snow.sz = (100 / (10 + (Math.random() * 100))) * sc
      snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp
      snow.sp = snow.sp < min ? min : snow.sp
      arr.push(snow)
    }

    // intialize timer
    const fps = 24
    const fpsInterval = 1000 / fps
    let then = Date.now(), now, elapsed

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
          f.t += .05
          f.t = f.t >= Math.PI * 2 ? 0 : f.t
          f.y += f.sp
          f.x += Math.sin(f.t * tsc) * (f.sz * .3) * Math.random()
          if (f.y > height + 50) f.y = -10 - Math.random() * mv
          if (f.x > width + mv) f.x = - mv
          if (f.x < - mv) f.x = width + mv
          f.draw()
        }
      }
    }

    function flake() {
       this.draw = function() {
         this.g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz)
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

  componentDidMount() {
    this.snowy()

    const ratio = 0.5
    window.onscroll = (e) => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const opacity = scrollTop > ratio * window.innerHeight ? 0 : 1 - scrollTop / window.innerHeight / ratio
      document.querySelector('.background').style.opacity =  opacity
    }
  }

  componentDidUpdate({ linkShown}) {
    if (!linkShown && this.state.linkShown) {
      ['main-links', 'more-text', 'arrow-down'].forEach(showClass => {
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
          <canvas id="snow"></canvas>
          <ProgressiveImage
            preview="/images/fabrice-villard-584622-unsplash-small.jpg"
            src="/images/fabrice-villard-584622-unsplash.jpg"
            render={(src, style) => <div className="background-image" style={Object.assign(style, { backgroundImage: `url(${src})`})} />}
          />
          <Typist
            className="title"
            startDelay={1200}
            avgTypingDelay={100}
            onCharacterTyped={() => {if (!this.state.linkShown) this.setState({ linkShown: true })}}
          >
            <span>hi, I'm Yi Liu</span>
            <Typist.Backspace count={6} delay={1000} />
            <span>Steven.</span>
          </Typist>
          <div className="main-links">
            <a href="https://blog.yliu.io">
              <span className="main-link">
                <TiPencil size={14} className="main-icon"/>
                <span className="main-link-text">blog</span>
              </span>
            </a>
            <a href="https://github.com/stevenliuyi">
              <span className="main-link">
                <TiCode size={14} className="main-icon" />
                <span className="main-link-text">github</span>
              </span>
            </a>
          </div>
          <div className="more-text" onClick={this.props.scrollToNav}>more</div>
          <div className="arrow-down" onClick={this.props.scrollToNav}>
            <IoIosArrowDown size={24} />
          </div>
        </div>
        <div className="background-empty"></div>
      </div>
    );
  }
}

export default Front;
