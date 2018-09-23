import React, { Component } from 'react'
import Page from './Page'

class Read extends Component {
  render() {
    return (
      <Page
        title="READ"
        quote="It is what you read when you don't have to that determines what you will be when you can't help it."
        author="Oscar Wilde"
        backgroundFilename="olia-gozha-678463-unsplash"
      >
        <div className="background-empty" />
      </Page>
    )
  }
}

export default Read
