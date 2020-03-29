import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { rhythm } from "../utils/typography"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const siteTitle = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges
  


 


  return (
    <Layout tag ={tag} title={siteTitle} description={description}>
          {edges.map(({ node }) => {
            const { title, date } = node.frontmatter;
            const { slug } = node.fields;
            return (
              <article key={node.fields.slug}>
                            <header>
                                <h3
                                    style={{
                                        marginBottom: rhythm(1 / 4),
                                    }}
                                >
                                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                                        {title}
                                    </Link>
                                </h3>
                                <small>{node.frontmatter.date}</small>
                            </header>
                            <section>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: node.frontmatter.description || node.excerpt,
                                    }}
                                />
                            </section>
                        </article>
            );
          })}
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`;