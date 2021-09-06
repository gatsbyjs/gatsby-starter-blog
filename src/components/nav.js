import React, { useEffect, useRef } from "react"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import "./nav.css"

const Nav = ({ tagsForTab }) => {
  let current
  const navRef = useRef(null)
  const location = useLocation()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: rhythm(1),
      }}
    >
      <div className="navWrapper">
        {tagsForTab.map((tag, i) => {
          const isActive = location && location.pathname === `/tags/${tag}/`
          const isHome = location && location.pathname === `/`
          if (tag === "all") {
            return (
              <div className={`navBox ${isHome ? "navBox-active" : ""}`}>
                <Link to={`/`}>{tag}</Link>
              </div>
            )
          }
          return (
            <div className={`navBox ${isActive ? "navBox-active" : ""}`}>
              <Link to={`/tags/${tag}/`}>{tag}</Link>
            </div>
          )
        })}

        {/* css 위치를 잡기위한 안보이는 DOM */}
        <div className="navBox navBox-end">1</div>
      </div>
    </div>
  )
}

export default Nav
