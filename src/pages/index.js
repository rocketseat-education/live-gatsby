import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = styled(Link)`
  color: #000;
  text-decoration: none;

  h1 {
    font-size: 30px;
    transition: opacity 150ms;

    &:hover {
      opacity: 0.8;
    }
  }
`

const IndexPage = ({ data }) => {
  const { allMarkdownRemark } = data
  const { edges } = allMarkdownRemark

  return (
    <Layout>
      <SEO title="Home" />
      <div>
        {edges.map(item => {
          const { node } = item
          const { frontmatter } = node

          return (
            <Post to={`/${frontmatter.path}`} key={frontmatter.path}>
              <h1>{frontmatter.title}</h1>
            </Post>
          )
        })}
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
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

export default IndexPage
