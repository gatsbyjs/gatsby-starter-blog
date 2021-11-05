import * as React from "react"
import { graphql } from "gatsby"
import {
  PlasmicComponent,
  PlasmicRootProvider,
} from "@plasmicapp/loader-gatsby"
import Seo from "../components/seo"
import { initPlasmicLoaderWithRegistrations } from "../plasmic-init"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const { plasmicOptions, plasmicComponents } = data

  return (
    <PlasmicRootProvider
      loader={initPlasmicLoaderWithRegistrations(plasmicOptions)}
      prefetchedData={plasmicComponents}
    >
      <Seo title="Single post" />
      <PlasmicComponent component="/[slug]" />
    </PlasmicRootProvider>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    plasmicComponents(componentNames: ["/[slug]"])
    plasmicOptions
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
