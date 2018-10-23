import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import { Badge, Button } from 'reactstrap'
import { MdArrowForward } from 'react-icons/md'
import { Link } from 'react-router-dom'

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
            delay: this.props.delay + 250,
            duration: 1000
          }}
        />
        <div className="keywords-wrap noselect">
          <TweenOne
            key="0"
            animation={{
              opacity: 1,
              translateX: 0,
              delay: this.props.delay + 500
            }}
            className="keywords-title"
          >
            KEYWORDS
          </TweenOne>
          <TweenOne
            key="1"
            animation={{ opacity: 1, delay: this.props.delay + 700 }}
            component={Badge}
            color="secondary"
            className="keyword"
          >
            computational fluid dynamics
          </TweenOne>
          <TweenOne
            key="2"
            animation={{ opacity: 1, delay: this.props.delay + 900 }}
            component={Badge}
            color="secondary"
            className="keyword"
          >
            turbulence
          </TweenOne>
          <TweenOne
            key="3"
            animation={{ opacity: 1, delay: this.props.delay + 1100 }}
            component={Badge}
            color="secondary"
            className="keyword"
          >
            high performance computing
          </TweenOne>
        </div>
        <div className="researches">
          <TweenOne
            key="2"
            className="research"
            animation={{
              opacity: 1,
              translateX: 0,
              delay: this.props.delay + 1000,
              duration: 1000
            }}
          >
            <div className="research-image-wrap noselect">
              <img
                className="research-image"
                src="/images/gulf_stream.png"
                alt="gulf strem coherent structures"
              />
            </div>
            <div className="research-text">
              <div className="research-title">
                Lagrangian coherent structures in the Gulf Stream
              </div>
              <div className="research-detai">
                The finite-time Lyapunov exponent (FTLE) is calculated from
                satellite altimetry to identify Lagrangian coherent structures
                (LCS) in the Gulf Stream region to reexamine a picture of the
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
              delay: this.props.delay + 1500,
              duration: 1000
            }}
          >
            <div className="research-image-wrap noselect">
              <img
                className="research-image"
                src="/images/channel_flow_q.png"
                alt="channel flow q criterion"
              />
            </div>
            <div className="research-text">
              <div className="research-title">
                Wall pressure fluctuations in compressible turbulent channel
                flows
              </div>
              <div className="research-detai">
                Direct numerical simulations (DNS) are performed using
                high-order non-dissipative schemes to investigate spatiotemporal
                characteristics of unsteady wall pressure in both subsonic and
                supersonic compressible channel flows.
              </div>
            </div>
          </TweenOne>
        </div>
        <Link to={{ pathname: '/resume', backId: 'research-page' }}>
          <TweenOne
            animation={{
              opacity: 0,
              translateY: 50,
              type: 'from',
              delay: this.props.delay + 2000
            }}
            className="research-more-button noselect"
          >
            <div className="research-more-button-front">
              <span>More on my résumé</span>
              <MdArrowForward
                className="research-more-button-arrow"
                size={24}
              />
            </div>
            <div className="research-more-button-background" />
          </TweenOne>
        </Link>
      </ScrollOverPack>
    )
  }
}

export default Research
