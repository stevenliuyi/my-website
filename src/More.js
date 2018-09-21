import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import MoreItem from './MoreItem'

const ScrollOverPack = ScrollAnim.OverPack

class More extends Component {

  render() {
    return (
      <ScrollOverPack id="more-page" className="more-page" playScale={0.5} always={false}>
        <Texty key='0' className="section-title noselect" delay={this.props.delay}>MORE</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
        <div className="more-items">
          <MoreItem title="Github" number="39" description="repositories" pic="markus-spiske-507983-unsplash-small.jpg" url="https://github.com/stevenliuyi" {...this.props} />
          <MoreItem title="Blog" number="43" description="articles" pic="aaron-burden-64849-unsplash-small.jpg" url="https://blog.yliu.io" {...this.props} />
        </div>
      </ScrollOverPack>
    );
  }
}

export default More;
