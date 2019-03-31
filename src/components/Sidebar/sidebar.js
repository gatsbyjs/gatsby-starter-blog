import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import Bio from "../Bio/bio"
import styles from './sidebar.module.scss'

const Nav = ({ data }) => {
  const { menu } = data.site.siteMetadata

  return (
    <nav>
      <Bio />
      <ul className={styles.navList}>
        {menu.map((m) => {
          return <li key={m.label}>
            <Link to={m.path}>{m.label} </Link>
          </li>
        })}
      </ul>
    </nav>
  )
}

export const Sidebar = (props) => (
  <StaticQuery
    query={graphql`
      query SidebarQuery {
        site {
          siteMetadata {
            title
            subtitle
            social {
              twitter
              github
            }
            menu {
              label
              path
            }
          }
        }
      }
    `}
    render={(data) => <Nav {...props} data={data}/>}
    />
) 

export default Sidebar