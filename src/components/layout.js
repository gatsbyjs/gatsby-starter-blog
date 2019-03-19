import React from "react"
import { Link } from "gatsby"
import Logo from "./logo"
import { rhythm } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header = (
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {location.pathname === rootPath ? <Logo /> : <Logo variant="small" />}
      </Link>
    )

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
