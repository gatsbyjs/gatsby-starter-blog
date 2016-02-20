import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { Container } from 'react-responsive-grid'
import { link } from 'gatsby-helpers'
import { rhythm, fontSizeToMS } from 'utils/typography'
import { config } from 'config'

import '../css/styles.css'

export default class extends React.Component {
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  }
  render () {
    let header
    if (this.props.route.path === link('/')) {
      header = (
        <h1
          style={{
            fontSize: fontSizeToMS(2.5).fontSize,
            lineHeight: fontSizeToMS(2.5).lineHeight,
            marginBottom: rhythm(1.5),
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={link('/')}
          >
            {config.blogTitle}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={link('/')}
          >
            {config.blogTitle}
          </Link>
        </h3>
      )
    }
    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(2)} ${rhythm(1/2)}`,
        }}
      >
        {header}
        <RouteHandler {...this.props}/>
      </Container>
    )
  }
}
