import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import { GoOctoface } from 'react-icons/go'
import { FaBookOpen } from 'react-icons/fa'
import MoreItem from './MoreItem'
import { getBlogCount } from '../utils/utils'
import readingListCount from '../data/read-count.yml'

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
            title="github"
            number="39"
            description="Repositories"
            pic="markus-spiske-507983-unsplash-small.jpg"
            url="https://github.com/stevenliuyi"
            logo={<GoOctoface size={50} color="#eee" />}
            {...this.props}
          />
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
            number={readingListCount.count}
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
            number={16}
            description="Works"
            pic="agence-olloweb-520953-unsplash-small.jpg"
            link={{ pathname: '/portfolio', backId: 'more-page' }}
            logo={
              <FaBookOpen
                size={50}
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
