import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import textEnter from './textEnter'
import 'rc-texty/assets/index.css'

const ScrollOverPack = ScrollAnim.OverPack

class Footer extends Component {

  render() {
    return (
      <ScrollOverPack id="contact-page" className="contact-page" playScale={0.1} always={false}>
        <Texty key='0' enter={textEnter} className="section-title" delay={this.props.delay}>THANKS</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
      </ScrollOverPack>
    );
  }
}

export default Footer;
