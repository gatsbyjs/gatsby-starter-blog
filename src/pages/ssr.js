import * as React from "react"
import fetch from "isomorphic-fetch"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ location, serverData }) => {
  const siteTitle = `Title`

  console.log({ serverData })
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />

      <img src={serverData.message} alt="server image" />
    </Layout>
  )
}

export default BlogIndex

export async function getServerData() {
  const res = await fetch(`https://dog.ceo/api/breeds/image/random`)

  return {
    props: await res.json(),
  }
}
