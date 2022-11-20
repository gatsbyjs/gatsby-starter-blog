import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "tailwindcss/tailwind.css"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="bg-white dark:bg-black transition-all min-h-screen">
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main>{children}</main>
        <Footer />
    </div>
  )
}

export default Layout
