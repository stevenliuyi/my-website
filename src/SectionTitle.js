import React from 'react';
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'

const SectionTitle = (props) => [
    <Texty key='0' type="left" mode="smooth" className="section-title" delay={500}>{ props.title }</Texty>,
    <TweenOne key='1' className="underline" style={{ opacity: 0, transform: 'translateX(-50px)'}} animation={{ opacity: 1, translateX: 0, delay: 750, duration: 1000}} />
]

export default SectionTitle;
