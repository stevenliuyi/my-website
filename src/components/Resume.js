import React, { Component } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import Page from './Page'
import { Container, Row, Col, Badge, Tooltip } from 'reactstrap'
import ScrollAnim from 'rc-scroll-anim'
import { MdSchool, MdWork } from 'react-icons/md'
import {
  FaGlobe,
  FaEnvelope,
  FaGithub,
  FaChalkboard,
  FaBookReader,
  FaIntegral,
  FaAward,
  FaChalkboardTeacher
} from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { IoIosDocument } from 'react-icons/io'
import ResumeSection from './ResumeSection'
import { Helmet } from 'react-helmet'
import Particles from 'react-particles-js'

const ScrollOverPack = ScrollAnim.OverPack

class Resume extends Component {
  state = {
    data: null,
    delay: 150,
    width: window.innerWidth,
    height: window.innerHeight,
    tooltipOpen: false
  }

  removeUrlProtocol = url => url.replace(/(^\w+:|^)\/\//, '')

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
    // dynamically import resume
    import('../data/resume.yml')
      .then(m => m.default)
      .then(data => this.setState({ data }))

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
    if (this.state.data == null) return <div />

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
                      <span className="cv-basic-info">
                        <a
                          href={`mailto:${
                            this.state.data.basic.email.personal
                          }`}
                        >
                          {this.state.data.basic.email.personal}
                        </a>
                      </span>
                    </div>
                    <div className="cv-basic-row">
                      <FaGlobe color={'#ccc'} />
                      <span className="cv-basic-info">
                        <a href={this.state.data.basic.website}>
                          {this.removeUrlProtocol(
                            this.state.data.basic.website
                          )}
                        </a>
                      </span>
                    </div>
                    <div className="cv-basic-row">
                      <FaGithub color={'#ccc'} />
                      <span className="cv-basic-info">
                        <a href={this.state.data.basic.github}>
                          {this.removeUrlProtocol(this.state.data.basic.github)}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={12} md={9} style={{ paddingBottom: 100 }}>
                <ResumeSection title="EDUCATION" icon={<MdSchool />}>
                  {this.state.data.education.map((edu, idx) => (
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
                              {study.details != null &&
                                study.details.map((item, idx) => (
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
                  {this.state.data.experience.map((exp, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} md={9} className="cv-item-title">
                          <span className="bold">{exp.title}</span> at{' '}
                          <span
                            dangerouslySetInnerHTML={{ __html: exp.institute }}
                          />
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
                  {this.state.data.research.map((research, idx) => (
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
                  {this.state.data.courses.map((cat, idx) => (
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
                  {this.state.data.teaching.map((position, idx) => (
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
                <ResumeSection title="PUBLICATIONS" icon={<IoIosDocument />}>
                  {this.state.data.publications.map((publication, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={12} className="cv-item-title">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: publication.authors
                            }}
                          />
                          <span>. </span>
                          <span>
                            <a
                              className="cv-link"
                              target="_blank"
                              href={publication.link}
                              rel="noopener noreferrer"
                            >
                              {publication.title}
                            </a>
                          </span>
                          <span>. </span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: publication.detail
                            }}
                          />
                          <span>. </span>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </ResumeSection>
                <ResumeSection
                  title="PRESENTATIONS & ABSTRACTS"
                  icon={<FaChalkboardTeacher />}
                >
                  {this.state.data.presentations.map((presentation, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={12} className="cv-item-title">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: presentation.authors
                            }}
                          />
                          <span>. </span>
                          <span>
                            {presentation.link != null ? (
                              <a
                                className="cv-link"
                                target="_blank"
                                href={presentation.link}
                                rel="noopener noreferrer"
                              >
                                {presentation.title}
                              </a>
                            ) : (
                              presentation.title
                            )}
                          </span>
                          <span>. </span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: presentation.detail
                            }}
                          />
                          <span>. </span>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </ResumeSection>
                <ResumeSection title="HONORS & AWARDS" icon={<FaAward />}>
                  {this.state.data.awards.map((award, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} md={9} className="cv-item-title">
                          <div>
                            {award.award}{' '}
                            <span className="cv-details">
                              {award.detail != null ? `(${award.detail})` : ''}
                            </span>
                          </div>
                        </Col>
                        <Col xs={4} md={3} className="cv-item-right">
                          {award.time}
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Tooltip
                    placement="top"
                    target="corresponding-author"
                    isOpen={this.state.tooltipOpen}
                    autohide={true}
                    toggle={() =>
                      this.setState({
                        tooltipOpen: !this.state.tooltipOpen
                      })
                    }
                  >
                    corresponding author
                  </Tooltip>
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
