import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import 'rc-texty/assets/index.css'
import { TiHeart } from 'react-icons/ti'
import { FaFacebookF, FaWeixin, FaKey } from 'react-icons/fa'
import { MdLock } from 'react-icons/md'
import { Tooltip } from 'reactstrap'
import { textEnter } from '../utils/textEnter'
import { getImageURL } from '../utils/utils'

const ScrollOverPack = ScrollAnim.OverPack

class Footer extends Component {
  state = {
    wechatOpen: false,
    pgpOpen: false
  }

  render() {
    const leftText = `© ${new Date().getFullYear()} | Handcrafted with`
    const rightText = 'by YI LIU'
    return (
      <ScrollOverPack
        id="contact-page"
        className="contact-page"
        playScale={0.1}
        always={false}
      >
        <div
          className="footer-background"
          style={{
            backgroundImage:
              process.env.NODE_ENV === 'development'
                ? 'url(/images/ricardo-gomez-angel-298363-unsplash.jpg)'
                : `url(${getImageURL(
                    'ricardo-gomez-angel-298363-unsplash.jpg',
                    { f: 'auto', c: 'scale', h: 250 * window.devicePixelRatio }
                  )})`
          }}
        />
        <Texty
          key="0"
          className="section-title noselect"
          delay={this.props.delay}
        >
          GET IN TOUCH
        </Texty>
        <TweenOne
          key="1"
          className="underline"
          animation={{
            opacity: 1,
            translateX: 0,
            delay: this.props.delay + 100,
            duration: 1000
          }}
        />
        <a href="mailto:me@yliu.io">
          <Texty
            key="3"
            className="contact-email"
            enter={textEnter}
            delay={this.props.delay + 200}
            interval={100}
          >
            me@yliu.io
          </Texty>
        </a>
        <footer className="footer">
          <div className="footer-left">
            <TweenOne
              component="span"
              key="0"
              animation={{
                opacity: 0,
                type: 'from',
                delay: this.props.delay + 300
              }}
              className="footer-icon"
            >
              <a
                href="https://www.facebook.com/stevenliuyi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={18} />
              </a>
            </TweenOne>
            <TweenOne
              component="span"
              key="1"
              animation={{
                opacity: 0,
                type: 'from',
                delay: this.props.delay + 300
              }}
              className="footer-icon"
            >
              <FaWeixin id="wechat-icon" size={18} />
              <Tooltip
                placement="top"
                isOpen={this.state.wechatOpen}
                target="wechat-icon"
                toggle={() =>
                  this.setState({ wechatOpen: !this.state.wechatOpen })
                }
                innerClassName="footer-tooltip wechat-tooltip"
                arrowClassName="footer-tooltip-arrow"
                autohide={false}
              >
                <img
                  src="images/wechat-qrcode.png"
                  alt="QR code"
                  width={120}
                  height={120}
                />
              </Tooltip>
            </TweenOne>
            <TweenOne
              component="span"
              key="2"
              animation={{
                opacity: 0,
                type: 'from',
                delay: this.props.delay + 300
              }}
              className="footer-icon"
            >
              <MdLock id="pgp-icon" size={18} />
              <Tooltip
                placement="top"
                autohide={false}
                isOpen={this.state.pgpOpen}
                target="pgp-icon"
                toggle={() => this.setState({ pgpOpen: !this.state.pgpOpen })}
                innerClassName="footer-tooltip"
                arrowClassName="footer-tooltip-arrow"
              >
                <div style={{ padding: '10px' }}>
                  <FaKey size={48} color={'#ccc'} />
                  <div style={{ textAlign: 'left', marginTop: '10px' }}>
                    If you are security-paranoid (which is a good thing of
                    course), you can send me encrypted messages using my PGP key{' '}
                    <a
                      href="https://keybase.io/stevenliuyi/pgp_keys.asc"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="footer-dotted-text">0x3B2DB4E7</span>
                    </a>
                    . My Keybase profile is{' '}
                    <a
                      href="https://keybase.io/stevenliuyi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="footer-dotted-text">stevenliuyi</span>
                    </a>
                    .
                  </div>
                </div>
              </Tooltip>
            </TweenOne>
          </div>
          <div className="footer-right noselect">
            <Texty
              key="0"
              type="right"
              mode="smooth"
              delay={this.props.delay + 300}
            >
              {leftText}
            </Texty>
            <TweenOne
              key="1"
              className="heart"
              animation={{
                opacity: 0,
                scale: 0,
                type: 'from',
                delay: this.props.delay + 400 + 50 * leftText.length,
                duration: 200
              }}
            >
              <span>
                <TiHeart size={14} />
              </span>
            </TweenOne>
            <Texty
              key="2"
              type="right"
              mode="smooth"
              delay={this.props.delay + 500 + 50 * leftText.length}
            >
              {rightText}
            </Texty>
          </div>
        </footer>
      </ScrollOverPack>
    )
  }
}

export default Footer
