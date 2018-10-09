import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import Page from './Page'
import { Container, Row, Col } from 'reactstrap'
import ScrollAnim from 'rc-scroll-anim'
import { MdSchool } from 'react-icons/md'

const ScrollOverPack = ScrollAnim.OverPack

const data = {
  education: [
    {
      school: 'University of Notre Dame',
      location: 'Notre Dame, IN',
      studies: [
        {
          title: 'Ph.D. student in Aerospace & Mechanical Engineering',
          time: '2016 - Present',
          items: ['GPA: 4.0/4.0', 'Advisor: Prof. Meng Wang']
        }
      ]
    },
    {
      school: 'Syracuse University',
      location: 'Syracuse, NY',
      studies: [
        {
          title: 'M.S. in Mechanical & Aerospace Engineering',
          time: '2013 - 2015',
          items: ['GPA: 4.0/4.0', 'Advisor: Prof. Melissa Green']
        }
      ]
    },
    {
      school: 'Tongji University',
      location: 'Shanghai, China',
      studies: [
        {
          title: 'B.S. in Automotive Engineering',
          time: '2007 - 2012',
          items: ['GPA: 86.21/100']
        },
        {
          title:
            'Visiting student in Industrial Design at College of Architecture and Urban Planning',
          time: '2007 - 2009'
        }
      ]
    }
  ]
}

class Resume extends Component {
  state = {
    delay: 150
  }

  handleScroll = e => {
    if (window.innerWidth < 768) return

    const scrollTop =
      document.documentElement.scrollTop || document.scrollingElement.scrollTop

    const sidebarWrap = document.querySelector('.cv-sidebar-wrap')
    const sidebar = document.querySelector('.cv-sidebar')
    if (sidebar == null || sidebarWrap == null) return

    const offset = sidebarWrap.offsetTop - scrollTop
    if (offset < 100) {
      sidebar.style.marginTop = `${100 - offset}px`
    }
  }

  componentDidMount() {
    scrollToComponent(this.page, { align: 'top', duration: 1 })
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <ScrollOverPack scale={0.5} always={false}>
        <Page
          ref={el => (this.page = el)}
          title="RÉSUMÉ"
          quote=""
          author=""
          backgroundFilename="adrien-olichon-1059275-unsplash"
          delay={this.state.delay}
          {...this.props}
        >
          <Container style={{ marginTop: 100 }}>
            <Row>
              <Col sm={12} md={3} className="cv-sidebar-wrap">
                <div className="cv-sidebar">
                  <img
                    className="cv-photo"
                    src="/images/photo.jpg"
                    width={200}
                    height={200}
                    alt="avatar"
                  />
                  <div className="cv-name">
                    <span>YI</span> <span>LIU</span>
                  </div>
                </div>
              </Col>
              <Col sm={12} md={9}>
                <div className="cv-section">
                  <div className="cv-section-title">
                    <MdSchool />
                    <span className="cv-section-title-text">EDUCATION</span>
                  </div>
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} className="cv-item-title">
                          {edu.school}
                        </Col>
                        <Col xs={4} className="cv-item-right">
                          {edu.location}
                        </Col>
                      </Row>
                      {edu.studies.map((study, idx) => (
                        <div key={idx}>
                          <Row className="cv-item-sub">
                            <Col xs={8} className="cv-item-subtitle">
                              {study.title}
                            </Col>
                            <Col xs={4} className="cv-item-right">
                              {study.time}
                            </Col>
                          </Row>
                          <Row>
                            <ul>
                              {study.items != null &&
                                study.items.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                            </ul>
                          </Row>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Resume
