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
              html
              frontmatter {
                title
                date(formatString: "DD/MM")
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

      createPage({
        path: frontmatter.path,
        component: post,
        context: {
          path: frontmatter.path,
        },
      })
    })
  })
}
