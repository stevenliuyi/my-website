import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import { Badge, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import MoreButton from './MoreButton'

const ScrollOverPack = ScrollAnim.OverPack

class Research extends Component {
  render() {
    return (
      <ScrollOverPack
        id="research-page"
        className="research-page"
        playScale={0.5}
        always={false}
      >
        <Texty
          key="0"
          className="section-title noselect"
          delay={this.props.delay}
        >
          RESEARCH
        </Texty>
        <TweenOne
          key="1"
          className="underline"
          animation={{
            opacity: 1,
            translateX: 0,
            delay: this.props.delay + 100,
            duration: 1000,
          }}
        />
        <div className="keywords-wrap noselect">
          <TweenOne
            key="0"
            animation={{
              opacity: 1,
              translateX: 0,
              delay: this.props.delay + 200,
            }}
            className="keywords-title"
          >
            KEYWORDS
          </TweenOne>
          <TweenOne
            key="1"
            animation={{ opacity: 1, delay: this.props.delay + 300 }}
            component={Badge}
            color="secondary"
            className="keyword"
          >
            computational fluid dynamics
          </TweenOne>
          <TweenOne
            key="2"
            animation={{ opacity: 1, delay: this.props.delay + 400 }}
            component={Badge}
            color="secondary"
            className="keyword"
          >
            turbulence
          </TweenOne>
          <TweenOne
            key="3"
            animation={{ opacity: 1, delay: this.props.delay + 500 }}
            component={Badge}
            color="secondary"
            className="keyword"
          >
            high performance computing
          </TweenOne>
          <TweenOne
            key="4"
            animation={{ opacity: 1, delay: this.props.delay + 600 }}
            component={Badge}
            color="secondary"
            className="keyword"
          >
            dynamical system
          </TweenOne>
        </div>
        <div className="researches">
          <TweenOne
            key="2"
            className="research"
            animation={{
              opacity: 1,
              translateX: 0,
              delay: this.props.delay + 400,
              duration: 1000,
            }}
          >
            <div className="research-image-wrap noselect">
              <img
                className="research-image"
                src="images/research/gulf_stream.png"
                alt="gulf stream coherent structures"
              />
            </div>
            <div className="research-text">
              <div className="research-title">
                Lagrangian coherent structures in the Gulf Stream
              </div>
              <div className="research-detail">
                The finite-time Lyapunov exponent (FTLE) is calculated from
                satellite altimetry to identify Lagrangian coherent structures
                (LCS) in the Gulf Stream region to re-examine a picture of the
                transport and mixing processes in this region.
              </div>
              <Button
                outline
                color="secondary"
                size="sm"
                className="research-button"
                onClick={() => {
                  window.open(
                    'https://agupubs.onlinelibrary.wiley.com/doi/10.1002/2017JC013390',
                    '_blank'
                  )
                }}
              >
                Paper
              </Button>
            </div>
          </TweenOne>
          <TweenOne
            key="3"
            className="research"
            animation={{
              opacity: 1,
              translateX: 0,
              delay: this.props.delay + 600,
              duration: 1000,
            }}
          >
            <div className="research-image-wrap noselect">
              <img
                className="research-image"
                src="images/research/channel_flow_q.png"
                alt="channel flow q criterion"
              />
            </div>
            <div className="research-text">
              <div className="research-title">
                Wall pressure fluctuations in compressible turbulent
                wall-bounded flows
              </div>
              <div className="research-detail">
                Direct numerical simulations (DNS) with high-order
                non-dissipative scheme are performed to investigate
                spatiotemporal characteristics of unsteady wall pressure in
                low-Mach-number compressible turbulent channel flows and
                boundary layers.
              </div>
              <Button
                outline
                color="secondary"
                size="sm"
                className="research-button"
                onClick={() => {
                  window.open('https://doi.org/10.2514/6.2021-2142', '_blank')
                }}
              >
                Conference Paper
              </Button>
            </div>
          </TweenOne>
          <TweenOne
            key="4"
            className="research"
            animation={{
              opacity: 1,
              translateX: 0,
              delay: this.props.delay + 800,
              duration: 1000,
            }}
          >
            <div className="research-image-wrap noselect">
              <img
                className="research-image"
                src="images/research/step_flow.png"
                alt="step flow"
              />
            </div>
            <div className="research-text">
              <div className="research-title">
                High-Reynolds-number turbulent boundary layer flow over a
                forward step
              </div>
              <div className="research-detail">
                Wall-modeled large-eddy simulations (WMLES) are conducted to
                investigate the turbulent boundary-layer flow over a small
                forward-facing step at momentum-thickness Reynolds number of
                15,500, with a focus on the effect of the step on wall-pressure
                fluctuations.
              </div>
            </div>
          </TweenOne>
        </div>
        <Link to={{ pathname: '/resume', backId: 'research-page' }}>
          <MoreButton
            title={'More on my résumé'}
            delay={this.props.delay + 2000}
          />
        </Link>
      </ScrollOverPack>
    )
  }
}

export default Research
