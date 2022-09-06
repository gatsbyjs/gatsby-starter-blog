const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const makeSlug = require("slug")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [fields___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Like querying gatsby-transformer-remark's excerpt field with the
  // pruneLength parameter
  function trimOnBoundary(s, l) {
    if (s.length <= l) {
      return s
    }
    const chopped = s.substring(s, l + 1)
    const m = chopped.lastIndexOf(` `)
    return chopped.substring(0, m >= 0 ? m : m.length)
  }  
  
  if (node.internal.type === `MarkdownRemark`) {
    const { slug, date, title } = (() => {
    const parent = getNode(node.parent)
    if (parent.internal.type === `SecondEdition`) {
        // NOTE: In theory, gatsby-transformer-remark's excerpt field would work
        //       here but it's not available at the time onCreateNode is
        //       called - additionally, parent.intro is limited to just the first
        //       sentence and has a little more processing performed on it to
        //       make it more "title-like"
        const title = trimOnBoundary(parent.intro, 100)
        return {
          // Trailing and leading slashes to match the behaviour of
          // createFilePath, used below - without them, some of the links in
          // this starter break
          slug: `/${makeSlug(title)}/`,
          date: parent.date,
          title
        }
      }
      return {
        slug: createFilePath({ node, getNode }),
        date: node.frontmatter.date,
        title: node.frontmatter.title
      }
    })()
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
    createNodeField({
      node,
      name: `date`,
      value: date
    })
    createNodeField({
      node,
      name: `title`,
      value: title
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      description: String
    }

    type Fields {
      slug: String
      title: String
      date: Date @dateformat
    }
  `)
}
