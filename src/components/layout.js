import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"
import Logo from "./logo"
import Bio from "./bio"

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const isIndexPage = location.pathname === rootPath

    const header = (
      <Link to={`/`}>{isIndexPage ? <Logo /> : <Logo variant="small" />}</Link>
    )
    const aside = <Bio />

    return (
      <div
        className={classNames("Layout", {
          isIndexPage,
        })}
      >
        <header>{header}</header>
        {isIndexPage && <aside>{aside}</aside>}
        <main>{children}</main>
        {!isIndexPage && <aside>{aside}</aside>}
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
