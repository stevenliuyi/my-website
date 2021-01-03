import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  Tooltip,
} from 'reactstrap'
import TweenOne from 'rc-tween-one'
import { MdArrowForward } from 'react-icons/md'
import { getImageURL } from '../utils/utils'

class ProjectCard extends Component {
  state = {
    cardExpanded: false,
    tooltipOpen: false,
  }

  render() {
    return (
      <Card className="project-card">
        <CardImg
          top
          width="100%"
          src={
            process.env.NODE_ENV === 'development'
              ? `images/projects/${this.props.image}`
              : getImageURL(`projects/${this.props.image}`, {
                  f: 'auto',
                  c: 'scale',
                  w: 250 * window.devicePixelRatio,
                })
          }
          className="noselect"
        />
        <TweenOne
          component={CardBody}
          componentProps={{
            onMouseEnter: (e) => {
              this.props.expandCard(e)
              this.setState({ cardExpanded: true })
            },
            onMouseLeave: (e) => {
              this.props.collapseCard(e)
              this.setState({ cardExpanded: false })
            },
            onTouchStart: (e) => {
              if (this.props.cardExpanded) {
                this.props.collapseCard(e)
                this.setState({ cardExpanded: false })
              } else {
                this.props.expandCard(e)
                this.setState({ cardExpanded: true })
              }
            },
          }}
          animation={{
            opacity: 1,
            x: 0,
            duration: 1000,
            ease: 'easeOutQuart',
            delay: this.props.delay + 500,
          }}
        >
          <CardTitle className="project-card-title">
            {this.props.title}
          </CardTitle>
          <CardText>{this.props.desc}</CardText>
          <div
            className="project-card-expanded"
            style={{
              opacity: this.state.cardExpanded ? 1 : 0,
            }}
          >
            {this.props.tools.map((tool, i) => (
              <Badge key={i} className="noselect" pill>
                {tool}
              </Badge>
            ))}
            {this.props.link != null ? (
              <div className="project-card-link">
                <a
                  href={this.props.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>ENTER</span>
                  <MdArrowForward size={20} />
                </a>
              </div>
            ) : (
              <div className="project-card-link nolink" id={this.props.title}>
                <MdArrowForward size={20} color="#eee" />
                <Tooltip
                  placement="top"
                  target={this.props.title}
                  isOpen={this.state.tooltipOpen}
                  autohide={true}
                  toggle={() =>
                    this.setState({
                      tooltipOpen: !this.state.tooltipOpen,
                    })
                  }
                >
                  not publicly available yet
                </Tooltip>
              </div>
            )}
          </div>
        </TweenOne>
      </Card>
    )
  }
}

export default ProjectCard
