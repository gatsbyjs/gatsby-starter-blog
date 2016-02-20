import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import DocumentTitle from 'react-document-title'
import { link } from 'gatsby-helpers'
import { rhythm } from 'utils/typography'
import access from 'safe-access'
import { config } from 'config'

export default class extends React.Component {
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  }
  render () {
    const pageLinks = []
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, (page) =>
      access(page, 'data.date')
    ).reverse()
    sortedPages.forEach((page) => {
      const title = access(page, 'data.title') || page.path
      if (page.path && page.path !== '/' && access(page, 'file.extension') === '.md') {
        pageLinks.push(
          <li
            key={page.path}
            style={{
              marginBottom: rhythm(1/4),
            }}
          >
            <Link to={link(page.path)}>{title}</Link>
          </li>
        )
      }
    })
    return (
      <DocumentTitle title={config.blogTitle}>
        <div>
          <p
            style={{
              marginBottom: rhythm(2.5),
            }}
          >
            <img
              src="./kyle-round-small-pantheon.jpg"
              style={{
                float: 'left',
                marginRight: rhythm(1/4),
                marginBottom: 0,
                width: rhythm(2),
                height: rhythm(2),
              }}
            />
            Written by <strong>{config.authorName}</strong> who lives and works in San Francisco building useful things. <a href="https://twitter.com/kylemathews">You should follow him on Twitter</a>
          </p>
          <ul>
            {pageLinks}
          </ul>
        </div>
      </DocumentTitle>
    )
  }
}
