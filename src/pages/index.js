import * as React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  PlasmicComponent,
  PlasmicRootProvider,
} from "@plasmicapp/loader-gatsby"
import { initPlasmicLoaderWithRegistrations } from "../plasmic-init"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  const { plasmicComponents, plasmicOptions } = data
  return (
    <PlasmicRootProvider
      loader={initPlasmicLoaderWithRegistrations(plasmicOptions)}
      prefetchedData={plasmicComponents}
    >
      <Seo title="All posts" />
      <PlasmicComponent component="/" />
    </PlasmicRootProvider>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    plasmicComponents(componentNames: ["/"])
    plasmicOptions
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
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
`
