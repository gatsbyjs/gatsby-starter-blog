import React from 'react'
import { Link } from 'react-router'
import get from 'lodash/get'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import { rhythm } from 'utils/typography'
import include from 'underscore.string/include'
import Bio from 'components/Bio'

class BlogIndex extends React.Component {
  render () {
    const pageLinks = []
    const posts = get(this, 'props.data.allMarkdown.edges')
    posts.forEach((post) => {
      if (post.node.path !== '/404/') {
        const title = get(post, 'node.frontmatter.title') || post.node.path
        pageLinks.push(
          <li
            key={post.node.path}
            style={{
              marginBottom: rhythm(1/4),
            }}
          >
            <Link
              style={{boxShadow: 'none'}}
              to={prefixLink(post.node.path)}
            >
              {post.node.frontmatter.title}
            </Link>
          </li>
        )
      }
    })

    return (
      <DocumentTitle title={get(this, 'props.data.site.siteMetadata.title')}>
        <div>
          <Bio />
          <ul>
            {pageLinks}
          </ul>
        </div>
      </DocumentTitle>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = `
{
  site {
    buildTime
    siteMetadata {
      title
    }
  }
  allMarkdown(first: 2000) {
    edges {
      node {
        path
        frontmatter {
          title
        }
      }
    }
  }
}
`
