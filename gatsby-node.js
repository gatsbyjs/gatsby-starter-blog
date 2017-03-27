const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ args }) => {
  const { graphql } = args

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("templates/template-blog-post.js")
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
        pages.push({
          path: edge.node.slug, // required
          component: blogPost,
          context: {
            slug: edge.node.slug,
          },
        })
      })

      resolve(pages)
    })
  })
}

// Add custom url pathname for blog posts.
exports.modifyAST = ({ args }) => {
  const { ast } = args
  const files = select(ast, "File")
  files.forEach(file => {
    if (file.extension !== `md`) {
      return
    }
    const parsedFilePath = path.parse(file.relativePath)
    console.log(parsedFilePath)
    const slug = `/${parsedFilePath.dir}/`
    console.log(slug)
    file.slug = slug
    const markdownNode = select(file, `MarkdownRemark`)[0]
    if (markdownNode) {
      markdownNode.slug = slug
    }
  })
  return files
}
