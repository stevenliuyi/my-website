import React, { Component } from 'react'
import Page from './Page'
import { Container, Row, Col, Badge, Tooltip } from 'reactstrap'
import ScrollAnim from 'rc-scroll-anim'
import { MdSchool, MdWork, MdPictureAsPdf, MdRateReview } from 'react-icons/md'
import {
  FaGlobe,
  FaEnvelope,
  FaGithub,
  FaChalkboard,
  FaBookReader,
  FaIntegral,
  FaAward,
  FaChalkboardTeacher,
} from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { IoIosDocument } from 'react-icons/io'
import { Helmet } from 'react-helmet'
import Particles from 'react-particles-js'
import ResumeSection from './ResumeSection'
import data from '../data/resume.yml'

const ScrollOverPack = ScrollAnim.OverPack

class Resume extends Component {
  state = {
    data: null,
    delay: 150,
    width: window.innerWidth,
    height: window.innerHeight,
    tooltipOpen: null,
  }

  removeUrlProtocol = (url) => url.replace(/(^\w+:|^)\/\//, '')

  updateSize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
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

  initializeTooltip = () => {
    // count the number of "corresponding-author" in publications
    const caCount = data.publications
      .map((publication) =>
        publication.authors.includes('corresponding-author')
      )
      .reduce((sum, next) => sum + next, 0)
    if (caCount === 0) return

    // initialize tooltipOpen state
    let tooltipOpen = {}
    for (let i = 1; i <= caCount; i++) {
      tooltipOpen[`corresponding-author-${i}`] = false
    }

    this.setState({
      tooltipOpen: tooltipOpen,
    })
  }

  handleScroll = (e) => {
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
    this.setPhotoSize()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.updateSize)
    this.initializeTooltip()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateSize)
  }

  render() {
    if (data == null) return <div />

    return (
      <ScrollOverPack scale={0.5} always={false}>
        <Helmet>
          <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js" />
        </Helmet>
        <Page
          ref={(el) => (this.page = el)}
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
                    ),
                  },
                  color: {
                    value: '#aaa',
                  },
                  size: {
                    value: 3,
                  },
                  line_linked: {
                    distance: 200,
                    color: '#aaa',
                  },
                },
                interactivity: {
                  events: {
                    onhover: {
                      enable: true,
                      mode: 'grab',
                    },
                  },
                },
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
                      src="images/headshot.png"
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
                  <div className="cv-download">
                    <a href="resume.pdf" download="Yi_Liu_Resume">
                      <MdPictureAsPdf size={24} color={'#555'} />
                      <span className="cv-download-text">Download PDF</span>
                    </a>
                  </div>
                  <div className="cv-basic">
                    <div className="cv-basic-row">
                      <FaEnvelope color={'#ccc'} />
                      <span className="cv-basic-info">
                        <a href={`mailto:${data.basic.email.personal}`}>
                          {data.basic.email.personal}
                        </a>
                      </span>
                    </div>
                    <div className="cv-basic-row">
                      <FaGlobe color={'#ccc'} />
                      <span className="cv-basic-info">
                        <a href={data.basic.website}>
                          {this.removeUrlProtocol(data.basic.website)}
                        </a>
                      </span>
                    </div>
                    <div className="cv-basic-row">
                      <FaGithub color={'#ccc'} />
                      <span className="cv-basic-info">
                        <a href={`https://github.com/${data.basic.github}`}>
                          {data.basic.github}
                        </a>
                      </span>
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
                          {edu.link == null ? (
                            <div className="bold">{edu.school}</div>
                          ) : (
                            <div className="bold">
                              <a
                                className="cv-link"
                                target="_blank"
                                href={edu.link}
                                rel="noopener noreferrer"
                              >
                                {edu.school}
                              </a>
                            </div>
                          )}
                        </Col>
                        <Col xs={4} md={3} className="cv-item-right">
                          {edu.location}
                        </Col>
                      </Row>
                      {edu.studies.map((study, idx) => (
                        <div key={idx}>
                          <Row className="cv-item-sub">
                            <Col xs={8} md={9} className="cv-item-subtitle">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: study.title,
                                }}
                              />
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
                  {data.experience.map((exp, idx) => (
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
                                  href={`https://github.com/stevenliuyi/${course.github}`}
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
                <ResumeSection title="PUBLICATIONS" icon={<IoIosDocument />}>
                  {data.publications.map((publication, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={12} className="cv-item-title">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: publication.authors,
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
                              __html: publication.detail,
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
                  {data.presentations.map((presentation, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={12} className="cv-item-title">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: presentation.authors,
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
                              __html: presentation.detail,
                            }}
                          />
                          <span>. </span>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </ResumeSection>
                <ResumeSection title="HONORS & AWARDS" icon={<FaAward />}>
                  {data.awards.map((award, idx) => (
                    <div key={idx}>
                      <Row className="cv-item">
                        <Col xs={8} md={9} className="cv-item-title">
                          <div>
                            <span
                              dangerouslySetInnerHTML={{ __html: award.award }}
                            />{' '}
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
                  {this.state.tooltipOpen != null &&
                    Object.keys(this.state.tooltipOpen).map((key) => (
                      <Tooltip
                        key={key}
                        placement="top"
                        target={key}
                        isOpen={this.state.tooltipOpen[key]}
                        autohide={true}
                        toggle={() =>
                          this.setState({
                            tooltipOpen: {
                              ...this.state.tooltipOpen,
                              [key]: !this.state.tooltipOpen[key],
                            },
                          })
                        }
                      >
                        corresponding author
                      </Tooltip>
                    ))}
                </ResumeSection>
                <ResumeSection
                  title="PEER REVIEW ACTIVITIES"
                  icon={<MdRateReview />}
                >
                  <Col xs={12} className="cv-review">
                    {data.reviews.map((review, idx) => (
                      <span key={idx}>
                        <i>{review}</i>
                      </span>
                    ))}
                  </Col>
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
