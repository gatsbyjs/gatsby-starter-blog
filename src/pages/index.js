import React from "react"
import { Link, graphql } from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const description = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges

    return (
        <Layout location={this.props.location} title={siteTitle} description={description}>

          <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5NDTS7D');</script>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5NDTS7D"
                            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          <script data-ad-client="ca-pub-3733948010849819" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
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
            description
          }
        }
      }
    }
  }
`
