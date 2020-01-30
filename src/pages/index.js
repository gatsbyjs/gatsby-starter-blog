import React from "react"
import { Link, graphql } from "gatsby"
import { kebabCase } from 'lodash';


import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const description = data.site.siteMetadata.description
        const posts = data.allMarkdownRemark.edges
//TODO: 인덱스 페이지 태그 이쁘게 넣어야 함
        return (
            <Layout location={this.props.location} title={siteTitle} description={description}>
                <SEO title="All posts" />
                {posts.map(({ node }) => {
                    const title = node.frontmatter.title || node.fields.slug
                    return (
                        <article key={node.fields.slug}>
                            <header>
                                <h3
                                    style={{
                                        marginBottom: rhythm(1 / 4),
                                    }}
                                >
                                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                                        {title}
                                    </Link>
                                </h3>
                                <small>{node.frontmatter.date}</small>
                                {node.frontmatter.tags? (
                                    <div>
                                        <ul>
                                            {node.frontmatter.tags.map(tag =>(
                                                    <li key={tag + `tag`}>
                                                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                ):null}
                            </header>
                            <section>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: node.frontmatter.description || node.excerpt,
                                    }}
                                />
                            </section>
                        </article>
                    )
                })}
            </Layout>
        )
    }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            description
          }
        }
      }
    }
  }
`
