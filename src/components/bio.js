/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <p>
              Written by <strong>{author}</strong> who lives and works in Oslo,
              Norway building useful things.
              {` `}
              You should follow her on{" "}
              <a href={`https://twitter.com/${social.twitter}`}>
                Twitter
              </a>,{" "}
              <a href={`https://instagram.com/${social.instagram}`}>
                Instagram
              </a>{" "}
              and <a href={`https://github.com/${social.github}`}>GitHub</a>.
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          instagram
          github
        }
      }
    }
  }
`

export default Bio
