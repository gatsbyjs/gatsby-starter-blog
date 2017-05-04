const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { upsertPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("./src/templates/template-blog-post.js")
    graphql(
      `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      // Create blog posts pages.
      _.each(result.data.allMarkdownRemark.edges, edge => {
        upsertPage({
          path: edge.node.slug, // required
          component: blogPost,
          context: {
            slug: { eq: edge.node.slug },
          },
        })
      })

      resolve()
    })
  })
}

// Add custom url pathname for blog posts.
exports.onNodeCreate = ({ node, boundActionCreators, getNode }) => {
  const { updateNode } = boundActionCreators
  if (node.type === `File` && typeof node.slug === "undefined") {
    const parsedFilePath = path.parse(node.relativePath)
    const slug = `/${parsedFilePath.dir}/`
    node.slug = slug
    updateNode(node)
  } else if (
    node.type === `MarkdownRemark` &&
    typeof node.slug === "undefined"
  ) {
    const fileNode = getNode(node.parent)
    node.slug = fileNode.slug
    updateNode(node)
  }
}
