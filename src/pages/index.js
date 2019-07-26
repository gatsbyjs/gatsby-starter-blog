import React from 'react';
import styled from '@emotion/styled';

import Bio from 'components/molecules/bio';
import BaseLayout from 'templates/BaseLayout';
import SEO from 'templates/SEO';
import HyperLink from 'components/molecules/HyperLink';
import Row from 'templates/Row';
import { Text, SmallText, H3Text } from 'components/atoms/Text';
import Accent from 'components/atoms/Accent';

import { rhythm } from 'utils/typography';
import useConstant from 'utils/useConstant';
import useSiteMetadata from 'utils/useSiteMetadata';

import { graphql } from 'gatsby';

import curry from 'constants/curry';

export default function Index({ data: { allMarkdownRemark: { edges } } }) {
  const posts = edges.map(({ node: { fields, frontmatter } }) => ({ ...fields, ...frontmatter }));
  const { title } = useSiteMetadata();
  function PostPreview({ post }) {
    function PostTitlePreview() {
      const StyledTitle = useConstant(() => styled(H3Text)`
        margin-bottom: ${rhythm(1/4)};
      `);

      return (
        <HyperLink to={post.slug}>
          <StyledTitle>
            <Accent>
              {post.title}
            </Accent>
          </StyledTitle>
        </HyperLink>
      );
    }
    function PostAdditionalInformationPreview() {
      function PostDatePreview() {
        return (
          <SmallText>{post.date}</SmallText>
        );
      }
      function PostCurriesPreview() {
        const curries = parseInt(post.curries);

        return (
          <SmallText>{curry.repeat(curries)}</SmallText>
        );
      }

      return (
        <Row>
          <PostDatePreview />
          <PostCurriesPreview />
        </Row>
      );
    }
    function PostDescriptionPreview() {
      return (
        <Text>{post.description}</Text>
      );
    }

    return (
      <>
        <PostTitlePreview />
        <PostAdditionalInformationPreview />
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
            curries
          }
        }
      }
    }
  }
`;
