import * as React from "react"
import { PlasmicCanvasHost } from "@plasmicapp/loader-gatsby"
import "../plasmic-init"
import { graphql } from "gatsby"
import { initPlasmicLoaderWithRegistrations } from "../plasmic-init"

export default function Host({ data }) {
  const { plasmicOptions } = data
  initPlasmicLoaderWithRegistrations(plasmicOptions)
  return (
    <>
      <PlasmicCanvasHost />
    </>
  )
}

export const pageQuery = graphql`
  query {
    plasmicOptions
  }
`
