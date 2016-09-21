import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import get from 'lodash/get'
import { rhythm, adjustFontSizeToMSValue } from 'utils/typography'
import ReadNext from '../components/ReadNext'
//import { query } from '../components/ReadNext'
import Bio from 'components/Bio'
const query = `
readNext {
  path
  excerpt(pruneLength: 200)
  frontmatter {
    title
  }
}
`

class BlogPostRoute extends React.Component {
  render () {
    const post = this.props.data.markdown
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <DocumentTitle title={`${post.frontmatter.title} | ${siteTitle}`}>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.bodyHTML }} />
          <p
            style={{
              ...adjustFontSizeToMSValue(-1/5),
              display: 'block',
              marginBottom: rhythm(1),
            }}
          >
            Posted TODO DATE
          </p>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <ReadNext nextPost={post.frontmatter.readNext} />
          <Bio />
        </div>
      </DocumentTitle>
    )
  }
}

export default BlogPostRoute

export const pageQuery = `
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdown(path: $path) {
      id
      bodyHTML
      frontmatter {
        ${query}
        title
        #date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
