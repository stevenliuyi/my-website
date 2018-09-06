import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import 'rc-texty/assets/index.css'
import { TiHeart } from 'react-icons/ti'
import textEnter from './textEnter'

const ScrollOverPack = ScrollAnim.OverPack

class Footer extends Component {

  updateFooterPosition = () => {
    let footer = document.querySelector('.footer').style
    if (window.innerWidth > 450) {
      footer.justifyContent = 'flex-end'
      footer.right = '50px'
      footer.transform = 'translateX(0)'
    } else {
      footer.justifyContent = 'center'
      footer.right = '50%'
      footer.transform = 'translateX(50%)'
    }
  }

  componentDidMount() {
    this.updateFooterPosition()
    window.addEventListener('resize', this.updateFooterPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateFooterPosition)
  }

  render() {
    const leftText = "© 2018 | Handcrafted with"
    const rightText = "by YI LIU"
    return (
      <ScrollOverPack id="contact-page" className="contact-page" playScale={0.1} always={false}>
        <Texty key='0' className="section-title" delay={this.props.delay}>GET IN TOUCH</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
        { window.innerHeight > 750 &&
          <TweenOne key='2' className="footer-logo" animation={{ opacity: 1, rotate: 0, delay: this.props.delay + 500, duration: 1000 }}></TweenOne>
        }
        <a href="mailto:me@yliu.io">
          <Texty key='3' className="contact-email" enter={textEnter} delay={this.props.delay + 500} duration={1000}>me@yliu.io</Texty>
        </a>
        <div className="footer">
          <Texty key='0' className="footer-left" type="right" mode="smooth" delay={this.props.delay+500}>
            { leftText }
          </Texty>
          <TweenOne key='1' className="heart" animation={{ opacity: 0, scale: 0, type: 'from', delay: this.props.delay+600+50*leftText.length, duration: 200 }}>
            <span><TiHeart size={14} /></span>
          </TweenOne>
          <Texty key='2' className="footer-right" type="right" mode="smooth" delay={this.props.delay+800+50*leftText.length}>
            { rightText }
          </Texty>
        </div>
      </ScrollOverPack>
    );
  }
}

export default Footer;
