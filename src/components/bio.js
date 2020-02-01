/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/gatsby-icon.png/" }) {
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
          }
        }
      }
    }
  `)

  const { author} = data.site.siteMetadata;
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50
        }}

      />
        <p>하마 개발은
            '<strong>하마</strong>
            터면
            <strong>개발 </strong>안할뻔 했다' 의 줄임말 입니다.
            이 블로그는 비전공 개발자 차씨가 개발자로 성장하며 만들어 나가는 소소한 이야기와 개발 지식들을 다룹니다.
            <br/>
            <a href="https://www.facebook.com/cha.jesse">페이스북 둘러보기</a>
        </p>


    </div>
  )
}

export default Bio
