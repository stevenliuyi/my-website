import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import { Badge } from 'reactstrap'

const ScrollOverPack = ScrollAnim.OverPack

class Research extends Component {

  render() {
    return (
      <ScrollOverPack id="research-page" className="research-page" playScale={0.5} always={false}>
        <Texty key='0' type="left" mode="smooth" className="section-title" delay={this.props.delay}>RESEARCH</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
        <div className="keywords-wrap">
          <TweenOne key='0' animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 500}} className="keywords-title">KEYWORDS</TweenOne>
          <TweenOne key='1' animation={{ opacity: 1, delay: this.props.delay + 700}} component={Badge} color="secondary" className="keyword">computational fluid mechanics</TweenOne>
          <TweenOne key='2' animation={{ opacity: 1, delay: this.props.delay + 900}} component={Badge} color="secondary" className="keyword">turbulence</TweenOne>
          <TweenOne key='3' animation={{ opacity: 1, delay: this.props.delay + 1100}} component={Badge} color="secondary" className="keyword">high performance computing</TweenOne>
        </div>
        <div className="researches">
          <TweenOne key='2' className="research"  animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 1000, duration: 1000}}>
            <div className="research-image-wrap">
              <img className="research-image" src="/images/gulf_stream.png" alt="gulf strem coherent structures" />
            </div>
            <div className="research-text">
              <div className="research-title">Lagrangian coherent structures in the Gulf stream</div>
              <div className="research-detai">The finite‐time Lyapunov exponent (FTLE) is calculated from satellite altimetry to identify Lagrangian coherent structures (LCS) in the Gulf Stream region to reexamine a picture of the transport and mixing processes in this region.</div>
            </div>
          </TweenOne>
        </div>
      </ScrollOverPack>
    );
  }
}

export default Research;
