import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'
import ScrollAnim from 'rc-scroll-anim'
import TweenOne from 'rc-tween-one'
import Texty from 'rc-texty'

const ScrollOverPack = ScrollAnim.OverPack

class Projects extends Component {

  state = {
    cardExpanded: false,
    projectsLoaded: false
  }

  expandCard = e => {
    if (!this.state.projectsLoaded) return
    const img = e.currentTarget.parentElement.querySelector('img')
    if (img != null) img.style.maxHeight = '0px'
    this.setState({ cardExpanded: true })
  }

  collapseCard = e => {
    if (!this.state.projectsLoaded) return
    const img = e.currentTarget.parentElement.querySelector('img')
    if (img != null) img.style.maxHeight = '200px'
    this.setState({ cardExpanded: false })
  }

  render() {
    return (
      <ScrollOverPack id="project-page" className="project-page" playScale={0.5} always={false}>
        <Texty key='0' type="left" mode="smooth" className="section-title" delay={this.props.delay}>PROJECTS</Texty>
        <TweenOne key='1' className="underline" animation={{ opacity: 1, translateX: 0, delay: this.props.delay + 250, duration: 1000}} />
        <TweenOne key='2' className="projects"  animation={{ opacity: 1, translateY: 0, delay: this.props.delay + 1000, duration: 2000, onComplete: (e) => {
           this.setState({ projectsLoaded: true })
         }}}
        >
        { [...Array(6).keys()].map(i => (
          <Card key={i} className="project-card">
            <CardImg top width="100%" src="images/demo.jpg" />
              <TweenOne
                component={CardBody}
                componentProps={{
                  onMouseEnter: this.expandCard,
                  onMouseLeave: this.collapseCard,
                  onTouchStart: e => {
                    if (this.state.cardExpanded)
                      this.collapseCard(e)
                    else
                      this.expandCard(e)
                  }
                }}
                animation={{opacity: 1, x: 0, duration: 1000, ease: 'easeOutQuart', delay: this.props.delay + 500}}
              >
                <CardTitle className="project-card-title">{`Project ${i+1}`}</CardTitle>
                <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</CardText>
              </TweenOne>
          </Card>
        ))
        }
        </TweenOne>
      </ScrollOverPack>
    );
  }
}

export default Projects;
