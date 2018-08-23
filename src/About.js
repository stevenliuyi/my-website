import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'
import NumberCard from './NumberCard'

const ScrollOverPack = ScrollAnim.OverPack

class About extends Component {

  render() {
    return (
      <ScrollOverPack id="about-page" className="about-page" playScale={0.5} always={false}>
        <Texty key='0' type="left" mode="smooth" className="section-title" delay={this.props.delay}>ABOUT</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
        <TweenOne key='2' className="logo" animation={{ opacity: 1, rotateY: 0 ,  duration:1000, ease: 'easeInQuart', delay: this.props.delay }}>
          <img src="/icons/android-chrome-192x192.png" height={100} width={100} alt="logo" />
        </TweenOne>
        <div className="about-text">
          <TweenOne key='0' animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 1000, duration: 1000}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum est id diam ullamcorper cursus. Aenean pharetra dolor eget lorem scelerisque, quis blandit justo finibus. Aliquam a pulvinar nisl. Proin blandit velit sed ipsum pellentesque, ut feugiat enim volutpat. Curabitur turpis lectus, aliquet vitae ante a, facilisis consequat quam. 
          </TweenOne>
          <TweenOne key='1' animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 1200, duration: 1000}}>
            Nulla a egestas nibh. Suspendisse hendrerit magna sed odio dignissim blandit. Morbi pharetra mi non ullamcorper semper. Vestibulum mattis, est eget condimentum blandit, est eros tristique diam, sit amet mattis tellus enim quis augue. Sed sed justo tempus, auctor neque et, placerat nulla. Ut euismod fringilla diam nec varius.
          </TweenOne>
          <TweenOne key='2' animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 1400, duration: 1000}}>
            Etiam non tortor diam. Aliquam et tempus velit. Nam interdum nunc nec tortor gravida egestas. Curabitur porttitor sodales ante ut ullamcorper.
          </TweenOne>
        </div>
        <TweenOne key='3' className="number-cards" animation={{ opacity: 1, translateY: 0, duration: 1000, delay: this.props.delay + 2000 }}>
          <NumberCard description="number of Wikipedia articles I created" number="20,000" detail="These articles have been viewed 15 million times since 2015." />
          <NumberCard description="my Erdős number" number="6" detail={<div><a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Erdős_number">Erdős number</a> is one's collabration distance to mathematican Paul Erdös.</div>} />
          <NumberCard description="number of U.S. states I've set foot on" number="23" detail="... and Washington, D.C.!" />
          <NumberCard description="my favorite number" number="42" detail={<div>Because it's <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_(42)">the Answer to the Ultimate  Question of Life, the Universe, and Everything</a>!</div>}/>
        </TweenOne>
      </ScrollOverPack>
    );
  }
}

export default About;
