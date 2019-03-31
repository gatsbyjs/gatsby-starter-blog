import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styles from './layout.module.scss'
import Sidebar from '../Sidebar/sidebar'

const Header = () => {
  return (
    <StaticQuery
      query={graphql`
        query{
          site {
            siteMetadata {
              title
              subtitle
            }
          }
        }
      `}

      render={data => 
        <header>
          <h1 className={styles.title}>
            <Link to={`/`} className={styles.siteTitle}>{data.site.siteMetadata.title}</Link>
          </h1>
          <p className={styles.subtitle}>{data.site.siteMetadata.subtitle}</p>
        </header>
      }
    />
  )
}

class Layout extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <aside><Sidebar /></aside>
          <main>
            <Header />
            {this.props.children}
          </main>
        </div>
        <footer>
          © {new Date().getFullYear()}, Built with &hearts; and
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
