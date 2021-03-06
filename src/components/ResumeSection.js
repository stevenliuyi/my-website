import React, { Component } from 'react'

class ResumeSection extends Component {
  render() {
    return (
      <div className="cv-section">
        <div className="cv-section-title">
          <div className="cv-section-title-text-wrap">
            {this.props.icon}
            <span className="cv-section-title-text">{this.props.title}</span>
          </div>
          <div className="cv-section-line" />
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default ResumeSection
