import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import get from 'lodash/get'
import { rhythm, scale } from 'utils/typography'
import Bio from 'components/Bio'

class BlogPostRoute extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    console.log(this.props)

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}/>
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1/5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
      </div>
    )
  }
}

export default BlogPostRoute

export const pageQuery = `
  query BlogPostByPath($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(slug: { eq: $slug }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
