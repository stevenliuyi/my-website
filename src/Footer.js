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
        <Texty key='0' enter={textEnter} className="section-title" delay={this.props.delay}>GET IN TOUCH</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
        <TweenOne key='2' className="footer-logo" animation={{ opacity: 1, rotate: 0, delay: this.props.delay + 500, duration: 1000 }}></TweenOne>
        <TweenOne key='3' className="contact-email" animation={{ opacity: 1, translateY: 0, delay: this.props.delay + 500, duration: 1000}}><a href="mailto:me@yliu.io">me<span className="at">@</span>yliu.io</a></TweenOne>
        <div className="footer">
          <Texty key='4' type="right" mode="smooth" delay={this.props.delay+500}>
            © 2018 | Handcrafted with ❤ by YI LIU
          </Texty>
        </div>
      </ScrollOverPack>
    );
  }
}

export default Footer;
