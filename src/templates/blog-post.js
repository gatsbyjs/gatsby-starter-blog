import React from "react"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import "./post.css"
import {kebabCase} from "lodash";

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const siteTitle = this.props.data.site.siteMetadata.title;
        const { previous, next } = this.props.pageContext;
        const { ogimage } = post.frontmatter;
        const ogImagePath = ogimage && ogimage.childImageSharp.fixed.src;
        const disqusConfig = {
            url: `${this.props.data.site.siteMetadata.siteUrl}${post.fields.slug}`,
            identifier: post.fields.slug,
            title: post.frontmatter.title,
        };



        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.description || post.excerpt}
                    image={ogImagePath}
                />
                <article>
                    <header>
                        <h1
                            style={{
                                marginTop: rhythm(1),
                                marginBottom: 0,
                            }}
                        >
                            {post.frontmatter.title}
                        </h1>
                        <p
                            style={{
                                ...scale(-1 / 5),
                                display: `block`,
                                marginBottom: rhythm(1),
                            }}
                        >
                            {post.frontmatter.date}
                        </p>

                    </header>
                    <section className="blog-post" dangerouslySetInnerHTML={{ __html: post.html }} />
                     {post.frontmatter.tags? (
                            <div
                                style={{
                                     marginBottom: rhythm(1),

                                }}
                            >
                                <span>tags: </span>
                                <ul
                                    style={{
                                        display: `inline`,
                                        marginLeft:0,

                                    }}

                                >

                                    {post.frontmatter.tags.map(tag =>(
                                            <li
                                                key={tag + `tag`}
                                                style={{
                                                    textDecoration: "none",
                                                    display: `inline`,
                                                    paddingLeft: rhythm(1),
                                                }}
                                            >
                                                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ):null}
                    <hr
                        style={{
                            marginBottom: rhythm(1),
                        }}
                    />
                    <CommentCount config={disqusConfig} placeholder={''} />
                    <Disqus config={disqusConfig} />
                    <footer>

                    </footer>
                </article>

                <nav>
                    <ul
                        style={{
                            display: `flex`,
                            flexWrap: `wrap`,
                            justifyContent: `space-between`,
                            listStyle: `none`,
                            padding: 0,
                        }}
                    >
                        <li>
                            {previous && (
                                <Link to={previous.fields.slug} rel="prev">
                                    ← {previous.frontmatter.title}
                                </Link>
                            )}
                        </li>
                        <li>
                            {next && (
                                <Link to={next.fields.slug} rel="next">
                                    {next.frontmatter.title} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </Layout>
        )
    }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        ogimage { 
             childImageSharp {
               fixed {
                 src
               }
             }
           }
      }
    }
  }
`
