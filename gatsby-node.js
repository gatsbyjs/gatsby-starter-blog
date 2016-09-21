import _ from 'lodash'
import Promise from 'bluebird'
import path from 'path'

exports.rewritePath = (parsedFilePath, metadata) => {
  if (parsedFilePath.ext === 'md') {
    return `/${parsedFilePath.dirname.split('---')[1]}/`
  }
}

exports.createPages = ({ graphql }) => (
  new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve('./page-templates/blog-post.js')
    graphql(`
      {
        allMarkdown(first: 1000) {
          edges {
            node {
              path
            }
          }
        }
      }
    `)
    .then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      // Create blog posts pages.
      _.each(result.data.allMarkdown.edges, (edge) => {
        if (edge.node.path !== '/404/') {
          pages.push({
            path: edge.node.path,
            component: blogPost,
          })
        }
      })

      console.log(pages)
      resolve(pages)
    })
  })
)
