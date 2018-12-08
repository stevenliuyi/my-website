import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import { FaBookOpen } from 'react-icons/fa'
import { MdPalette } from 'react-icons/md'
import MoreItem from './MoreItem'
import { getBlogCount } from '../utils/utils'
import counts from '../data/counts.yml'

const ScrollOverPack = ScrollAnim.OverPack

class More extends Component {
  state = {
    blogCount: '40+'
  }

  componentDidMount() {
    getBlogCount().then(blogCount => this.setState({ blogCount }))
  }

  render() {
    return (
      <ScrollOverPack
        id="more-page"
        className="more-page"
        playScale={0.5}
        always={false}
      >
        <Texty
          key="0"
          className="section-title noselect"
          delay={this.props.delay}
        >
          MORE ON ME
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
        <div className="more-items">
          <MoreItem
            title="blog"
            number={this.state.blogCount}
            description="Articles"
            pic="aaron-burden-64849-unsplash-small.jpg"
            url="https://blog.yliu.io"
            logo={
              <i
                className="iconfont icon-pen"
                style={{
                  fontSize: 64,
                  color: '#eee',
                  transform: 'translateY(32px)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 60%, 0% 60%)',
                  WebkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 60%, 0% 60%)',
                  display: 'inline-block'
                }}
              />
            }
            {...this.props}
          />
          <MoreItem
            title="reading list"
            number={counts.read}
            description="Books"
            pic="erol-ahmed-460283-unsplash-small.jpg"
            link={{ pathname: '/read', backId: 'more-page' }}
            logo={
              <FaBookOpen
                size={50}
                color="#eee"
                style={{ transform: 'translateY(5px)' }}
              />
            }
            {...this.props}
          />
          <MoreItem
            title="portfolio"
            number={counts.portfolio}
            description="Works"
            pic="agence-olloweb-520953-unsplash-small.jpg"
            link={{ pathname: '/portfolio', backId: 'more-page' }}
            logo={
              <MdPalette
                size={55}
                color="#eee"
                style={{ transform: 'translateY(5px)' }}
              />
            }
            {...this.props}
          />
        </div>
      </ScrollOverPack>
    )
  }
}

export default More
