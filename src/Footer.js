import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'

const ScrollOverPack = ScrollAnim.OverPack

class Footer extends Component {

  render() {
    return (
      <ScrollOverPack id="contact-page" className="contact-page" playScale={0.1} always={false}>
        <Texty key='0' type="left" mode="smooth" className="section-title" delay={500}>THANKS</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: 750, duration: 1000}} />
      </ScrollOverPack>
    );
  }
}

export default Footer;
