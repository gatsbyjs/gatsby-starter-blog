import * as React from "react"
import { PlasmicCanvasHost } from "@plasmicapp/loader-gatsby"
import { Helmet } from "react-helmet"
import "../plasmic-init"

export default function Host() {
  return (
    <>
      <Helmet>
        <script src="https://static1.plasmic.app/preamble.js" />
      </Helmet>
      <PlasmicCanvasHost />
    </>
  )
}
