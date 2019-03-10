import React from "react"

import { rhythm } from "../utils/typography"

function Tag({ data }) {
  return (
    <span
      style={{
        background: "#dfdfdf",
        borderRadius: rhythm(1 / 4),
        marginRight: rhythm(1 / 4),
        paddingLeft: rhythm(1 / 4),
        paddingRight: rhythm(1 / 4),
      }}
    >
      {data}
    </span>
  )
}

export default function Tags({ tags, ...args }) {
  return (
    <span {...args}>
      {(tags || []).map(tag => (
        <Tag data={tag} key={tag} />
      ))}
    </span>
  )
}
