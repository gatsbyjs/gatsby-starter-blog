import React from 'react';
import styled from '@emotion/styled';

import { Link, graphql } from 'gatsby';
import Bio from 'components/molecules/bio';
import BaseLayout from 'templates/BaseLayout';
import SEO from 'components/seo';

import { rhythm } from 'utils/typography';
import useConstant from 'utils/useConstant';
import useSiteMetadata from 'utils/useSiteMetadata';

export default function Index({ data: { allMarkdownRemark: { edges } } }) {
  const posts = edges.map(({ node: { fields, frontmatter } }) => ({ ...fields, ...frontmatter }));
  const { title } = useSiteMetadata();
  function PostPreview({ post }) {
    function PostTitlePreview() {
      const StyledTitle = useConstant(() => styled.h3`
        margin-bottom: ${rhythm(1/4)};
      `);
      const StyledLink = useConstant(() => styled(Link)`
        box-shadow: none;
      `);
      
      return (
        <StyledTitle>
          <StyledLink to={post.slug}>
            {post.title}
          </StyledLink>
        </StyledTitle>
      );
    }
    function PostDatePreview() {
      return (
        <small>{post.date}</small>
      );
    }
    function PostDescriptionPreview() {
      return (
        <p>{post.description}</p>
      );
    }

    return (
      <>
        <PostTitlePreview />
        <PostDatePreview />
        <PostDescriptionPreview />
      </>
    );
  }
  function PostPreviewList({ posts }) {
    return posts.map(post => <PostPreview key={post.slug} post={post} />);
  }

  return (
    <BaseLayout>
      <SEO title={title} />
      <Bio />
      <PostPreviewList posts={posts} />
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
