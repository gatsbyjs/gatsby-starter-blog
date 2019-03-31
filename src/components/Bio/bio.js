import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styles from './bio.module.scss'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <div className={styles.bioContainer}>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <h2 className={styles.author}>{author}</h2>
            <Image fixed={data.laptop.childImageSharp.fixed} alt='laptop icon' />
            <p className={styles.bio}>Front End Developer</p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    laptop: file(absolutePath: {regex: "/laptop.png/"}) {
      childImageSharp {
        fixed(width: 30, height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
