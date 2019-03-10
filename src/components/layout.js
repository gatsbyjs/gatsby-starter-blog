import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { rhythm, scale } from "../utils/typography"

const BigTitle = styled.h1`
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
`

const SmallTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  margin-top: 0;
`

const TitleLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    // TODO get scale spread into styled-components
    if (location.pathname === rootPath) {
      header = (
        <BigTitle style={{ ...scale(1.5) }}>
          <TitleLink to={`/`}>{title}</TitleLink>
        </BigTitle>
      )
    } else {
      header = (
        <SmallTitle>
          <TitleLink to={`/`}>{title}</TitleLink>
        </SmallTitle>
      )
    }
    return (
      <Container>
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Container>
    )
  }
}

export default Layout
