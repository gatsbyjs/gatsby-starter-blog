/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm, scale } from "../utils/typography"

function Logo({ variant }) {
  return (
    <StaticQuery
      query={logoQuery}
      render={data => {
        const { author, title } = data.site.siteMetadata
        return (
          <h1
            style={{
              ...scale(variant !== `small` ? 1 : 0.5),
              display: `inline-flex`,
              margin: `${rhythm(1.5)} 0`,
            }}
          >
            {variant !== `small` && (
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  minWidth: 50,
                  outline: `5px solid orangered`,
                }}
              />
            )}
            <span
              style={{
                padding: `0 ${rhythm(1)}`,
                border: `5px solid orangered`,
                lineHeight: 1.5,
              }}
            >
              {title}
            </span>
          </h1>
        )
      }}
    />
  )
}

const logoQuery = graphql`
  query logoQuery {
    avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
      childImageSharp {
        fixed(width: 70, height: 70) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`

export default Logo
