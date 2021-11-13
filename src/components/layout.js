import * as React from "react"
import Navbar from "./navbar"

const Layout = ({ children }) => {

  return (
    <div className="global-wrapper">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default Layout