import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import Page from './Page'
import { Container, Row, Col, Badge } from 'reactstrap'
import ScrollAnim from 'rc-scroll-anim'
import { MdSchool, MdWork } from 'react-icons/md'
import {
  FaGlobe,
  FaEnvelope,
  FaGithub,
  FaChalkboard,
  FaBookReader,
  FaIntegral
} from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import ResumeSection from './ResumeSection'
import { Helmet } from 'react-helmet'
import Particles from 'react-particles-js'

const ScrollOverPack = ScrollAnim.OverPack

const data = {
  basic: {
    website: '<a href="https://yliu.io">yliu.io</a>',
    email: '<a href="mailto:me@yliu.io">me@yliu.io</a>',
    github:
      '<a href="https://github.com/stevenliuyi">github.com/stevenliuyi</a>'
  },
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
      institute:
        'Institute for Flow Physics and Control, University of Notre Dame',
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
  ],
  courses: [
    {
      category: 'Fluid',
      courses: [
        { title: 'Fluid Dynamics' },
        { title: 'Computational Fluid Dynamics', github: 'cfd-euler-2d' },
        { title: 'Turbomachinery' },
        { title: 'Continuum Mechanics' },
        { title: 'Advanced Aerodynamics' },
        { title: 'Turbulence' }
      ]
    },
    {
      category: 'Applied Math/Computer Science',
      courses: [
        { title: 'Statistical Methods in Data Mining', github: 'data-mining' },
        { title: 'Design & Analysis of Algorithms' },
        { title: 'Methods of Analysis' },
        { title: 'Numerical Methods' },
        { title: 'Mathematical Methods' },
        { title: 'Advanced Scientific Computing', github: 'lcs' },
        { title: 'Uncertainty Quantification', github: 'uq' },
        { title: 'Partial Differential Equations' }
      ]
    }
  ],
  teaching: [
    {
      title: 'Teaching Assistant',
      institute: 'University of Notre Dame',
      time: '2016 - Present',
      courses: [
        {
          title: 'AME20214 Introduction to Engineering Computing',
          time: 'Fall 2018'
        },
        { title: 'AME30363 Design of Machine Elements', time: 'Spring 2018' },
        { title: 'AME30331 Fluid Mechanics', time: 'Fall 2016, Fall 2017' },
        { title: 'AME20231 Thermodynamics', time: 'Spring 2017' }
      ]
    },
    {
      title: 'Teaching Assistant',
      institute: 'Syracuse University',
      time: '2014',
      courses: [
        { title: 'MAE585 Principle of Turbomachines', time: 'Fall 2014' }
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
                  <div className="cv-name noselect">
                    <div>
                      <span>YI</span> <span className="bold">LIU</span>
                    </div>
                    <div className="cv-nickname bold">STEVEN</div>
                  </div>
                  <div className="cv-basic">
                    <div className="cv-basic-row">
                      <FaEnvelope color={'#ccc'} />
                      <span
                        className="cv-basic-info"
                        dangerouslySetInnerHTML={{ __html: data.basic.email }}
                      />
                    </div>
                    <div className="cv-basic-row">
                      <FaGlobe color={'#ccc'} />
                      <span
                        className="cv-basic-info"
                        dangerouslySetInnerHTML={{ __html: data.basic.website }}
                      />
                    </div>
                    <div className="cv-basic-row">
                      <FaGithub color={'#ccc'} />
                      <span
                        className="cv-basic-info"
                        dangerouslySetInnerHTML={{ __html: data.basic.github }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={12} md={9} style={{ paddingBottom: 100 }}>
                <ResumeSection title="EDUCATION" icon={<MdSchool />}>
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} md={9} className="cv-item-title">
                          <div className="bold">{edu.school}</div>
                        </Col>
                        <Col xs={4} md={3} className="cv-item-right">
                          {edu.location}
                        </Col>
                      </Row>
                      {edu.studies.map((study, idx) => (
                        <div key={idx}>
                          <Row className="cv-item-sub">
                            <Col xs={8} md={9} className="cv-item-subtitle">
                              {study.title}
                            </Col>
                            <Col xs={4} md={3} className="cv-item-right">
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
                        <Col xs={8} md={9} className="cv-item-title">
                          <span className="bold">{exp.title}</span> at{' '}
                          {exp.institute}
                        </Col>
                        <Col xs={4} md={3} className="cv-item-right">
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
                  icon={<FaIntegral />}
                >
                  {data.research.map((research, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} md={9} className="cv-item-title">
                          <div className="bold">{research.title}</div>
                        </Col>
                        <Col xs={4} md={3} className="cv-item-right">
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
                <ResumeSection
                  title="SELECTED GRADUATE COURSES"
                  icon={<FaBookReader />}
                >
                  {data.courses.map((cat, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={12} className="cv-item-title cv-courses">
                          <span className="bold">{cat.category}</span>
                          {' — '}
                          {cat.courses.map((course, idx) => (
                            <span key={idx}>
                              {course.title}
                              {course.github != null && (
                                <a
                                  href={`https://github.com/stevenliuyi/${
                                    course.github
                                  }`}
                                  target="_blank"
                                  title="Github repository"
                                  rel="noopener noreferrer"
                                >
                                  <FiGithub />
                                </a>
                              )}
                            </span>
                          ))}
                        </Col>
                      </Row>
                    </div>
                  ))}
                </ResumeSection>
                <ResumeSection
                  title="TEACHING EXPERIENCE"
                  icon={<FaChalkboard />}
                >
                  {data.teaching.map((position, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} md={9} className="cv-item-title">
                          <span className="bold">{position.title}</span> at{' '}
                          {position.institute}
                        </Col>
                        <Col xs={4} md={3} className="cv-item-right">
                          {position.time}
                        </Col>
                      </Row>
                      <Row>
                        <ul className="cv-details cv-teaching-details">
                          {position.courses.map((course, idx) => (
                            <li key={idx}>
                              {course.title} ({course.time})
                            </li>
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
