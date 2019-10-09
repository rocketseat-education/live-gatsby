const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const post = path.resolve("src/templates/post.js")

  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
  ).then(result => {
    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
      const { frontmatter } = node
      const { path } = frontmatter

      createPage({
        path: path,
        component: post,
        context: {
          slug: path, // I used slug because path is a reserved word, and could cause conflicts
        },
      })
    })
  })
}
