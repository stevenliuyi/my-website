import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import Page from './Page'
import { Container, Row, Col, Badge } from 'reactstrap'
import ScrollAnim from 'rc-scroll-anim'
import { MdSchool, MdWork, MdCode } from 'react-icons/md'
import ResumeSection from './ResumeSection'
import { Helmet } from 'react-helmet'
import Particles from 'react-particles-js'

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
          keywords: [
            'computational fluid dynamics',
            'turbulence',
            'high-performance computing',
            'aeroacoustics'
          ],
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
          keywords: [
            'turbulence',
            'dynamical system',
            'geophysical fluid dynamics',
            'high-throughput computing',
            'GPU computing'
          ],
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
          keywords: [
            'transportation design',
            'automotive aerodynamics',
            'artificial neural network'
          ],
          items: ['GPA: 86.21/100']
        },
        {
          title:
            'Visiting student in Industrial Design at College of Architecture and Urban Planning',
          time: '2007 - 2009'
        }
      ]
    }
  ],
  experience: [
    {
      title: 'Research Assistant',
      institute: 'University of Notre Dame',
      time: '2016 - Present'
    },
    {
      title: 'Research Assistant',
      institute: 'Green Fluid Dynamics Lab, Syracuse University',
      time: '2014 - 2016'
    },
    {
      title: 'Programmer',
      institute: 'Core Infrastructure Services, Syracuse University',
      time: '2015 - 2016',
      details: [
        'Assisted researchers in Department of Biology by performing bioinformatics programming on OrangeGrid (a high-throughput computing environment on campus) for evolutionary biology researches.'
      ]
    }
  ],
  research: [
    {
      title: 'Lagrangian  coherent  structures  (LCS)  in  the  Gulf  Stream',
      time: '2014 - 2018',
      details: [
        'Developed programs to calculate the finite-time Lyapunov exponent (FTLE) and Lagrangian-averagedvorticity deviation (LAVD) to find LCS in the Gulf Stream region using altimeter data.',
        'Investigated the transport and mixing properties of the meandering jet and vortices, and the topological changesassociated with the structures.',
        'Code available at <a href="https://github.com/stevenliuyi/ocean-ftle">https://github.com/stevenliuyi/ocean-ftle</a>.'
      ]
    },
    {
      title: 'Three dimensional LCS in a turbulent channel flow',
      time: '2014 – 2016',
      details: [
        'Computed 3D FTLE fields of the direct numerical simulation (DNS) results of a turbulent channel flow toinvestigate the 3D coherent structures.',
        'Adopted high-throughput computing (HTC) technique to speed up 3D calculations.',
        'Code available at <a href="https://github.com/stevenliuyi/3d-ftle">https://github.com/stevenliuyi/3d-ftle</a>.'
      ]
    }
  ]
}

class Resume extends Component {
  state = {
    delay: 150,
    width: window.innerWidth,
    height: window.innerHeight
  }

  updateSize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
    this.setPhotoSize()
    this.handleScroll()
  }

  setPhotoSize = () => {
    const sidebar = document.querySelector('.cv-sidebar-wrap')
    if (sidebar == null) return

    const img = document.querySelector('.cv-photo > img')
    const background = document.querySelector('.cv-photo')
    const newSize = Math.min(200, sidebar.offsetWidth - 30)

    if (img != null) img.width = img.height = newSize
    if (background != null)
      background.style.width = background.style.height = `${newSize}px`
  }

  handleScroll = e => {
    const sidebar = document.querySelector('.cv-sidebar')
    if (window.innerWidth < 768 && sidebar != null) {
      sidebar.style.position = 'inherit'
      sidebar.style.top = 0
      return
    }

    const scrollTop =
      document.documentElement.scrollTop || document.scrollingElement.scrollTop

    const sidebarWrap = document.querySelector('.cv-sidebar-wrap')
    if (sidebar == null || sidebarWrap == null) return

    const offset = sidebarWrap.offsetTop - scrollTop
    if (offset < 100) {
      sidebar.style.top = '100px'
      sidebar.style.position = 'fixed'
    } else {
      sidebar.style.top = 0
      sidebar.style.position = 'absolute'
    }
  }

  componentDidMount() {
    scrollToComponent(this.page, { align: 'top', duration: 1 })
    this.setPhotoSize()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.updateSize)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateSize)
  }

  render() {
    return (
      <ScrollOverPack scale={0.5} always={false}>
        <Helmet>
          <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js" />
        </Helmet>
        <Page
          ref={el => (this.page = el)}
          title="RÉSUMÉ"
          quote=""
          author=""
          background={
            <Particles
              className="cover-canvas"
              width={this.state.width}
              height={this.state.height}
              params={{
                particles: {
                  number: {
                    value: parseInt(
                      (this.state.width * this.state.height) / 2e4,
                      10
                    )
                  },
                  color: {
                    value: '#aaa'
                  },
                  size: {
                    value: 3
                  },
                  line_linked: {
                    distance: 200,
                    color: '#aaa'
                  }
                },
                interactivity: {
                  events: {
                    onhover: {
                      enable: true,
                      mode: 'grab'
                    }
                  }
                }
              }}
            />
          }
          delay={this.state.delay}
          {...this.props}
        >
          <Container style={{ paddingTop: 100 }}>
            <Row>
              <Col sm={12} md={3} className="cv-sidebar-wrap">
                <div className="cv-sidebar">
                  <div className="cv-photo">
                    <div className="cv-photo-background" />
                    <img
                      src="/images/headshot.png"
                      width={200}
                      height={200}
                      alt="avatar"
                    />
                  </div>
                  <div className="cv-name">
                    <span>YI</span> <span>LIU</span>
                  </div>
                </div>
              </Col>
              <Col sm={12} md={9} style={{ paddingBottom: 100 }}>
                <ResumeSection title="EDUCATION" icon={<MdSchool />}>
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} className="cv-item-title">
                          <div className="bold">{edu.school}</div>
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
                          {study.keywords != null && (
                            <Row style={{ paddingLeft: 10 }}>
                              {study.keywords.map((key, idx) => (
                                <Badge key={idx} pill>
                                  {key}
                                </Badge>
                              ))}
                            </Row>
                          )}
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
                </ResumeSection>
                <ResumeSection title="EXPERIENCE" icon={<MdWork />}>
                  {data.experience.map((exp, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} className="cv-item-title">
                          <span className="bold">{exp.title}</span> at{' '}
                          {exp.institute}
                        </Col>
                        <Col xs={4} className="cv-item-right">
                          {exp.time}
                        </Col>
                      </Row>
                      <Row>
                        <ul className="cv-details">
                          {exp.details != null &&
                            exp.details.map((detail, idx) => (
                              <li key={idx}>{detail}</li>
                            ))}
                        </ul>
                      </Row>
                    </div>
                  ))}
                </ResumeSection>
                <ResumeSection
                  title="SELECTED RESEARCH PROJECTS"
                  icon={<MdCode />}
                >
                  {data.research.map((research, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} className="cv-item-title">
                          <div className="bold">{research.title}</div>
                        </Col>
                        <Col xs={4} className="cv-item-right">
                          {research.time}
                        </Col>
                      </Row>
                      <Row>
                        <ul className="cv-details">
                          {research.details != null &&
                            research.details.map((detail, idx) => (
                              <li
                                key={idx}
                                dangerouslySetInnerHTML={{ __html: detail }}
                              />
                            ))}
                        </ul>
                      </Row>
                    </div>
                  ))}
                </ResumeSection>
              </Col>
            </Row>
          </Container>
        </Page>
      </ScrollOverPack>
    )
  }
}

export default Resume
