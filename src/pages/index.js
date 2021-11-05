import * as React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import {
  PlasmicComponent,
  PlasmicRootProvider,
} from "@plasmicapp/loader-gatsby"
import { initPlasmicLoaderWithRegistrations } from "../plasmic-init"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

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
