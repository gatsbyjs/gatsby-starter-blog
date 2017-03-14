import React from 'react'
import { Link } from 'react-router'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { rhythm } from 'utils/typography'
import include from 'underscore.string/include'
import Bio from 'components/Bio'

class BlogIndex extends React.Component {
  render () {
    console.log(this.props)
    const pageLinks = []
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
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
              to={post.node.slug}
            >
              {post.node.frontmatter.title}
            </Link>
          </li>
        )
      }
    })

    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        <Bio />
        <ul>
          {pageLinks}
        </ul>
      </div>
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
    siteMetadata {
      title
    }
  }
  allMarkdownRemark {
    edges {
      node {
        slug
        frontmatter {
          title
        }
      }
    }
  }
}
`
