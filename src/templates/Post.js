import React from 'react';
import styled from '@emotion/styled';

import HyperLink from 'components/molecules/HyperLink';
import Bio from 'components/molecules/bio';
import SEO from 'templates/SEO';
import BaseLayout from 'templates/BaseLayout';
import Markdown from 'components/atoms/Markdown';
import Row from 'templates/Row';

import useConstant from 'utils/useConstant';

import { rhythm, scale } from 'utils/typography';
import { graphql } from 'gatsby';

export default function Post(
  {
    data: {
        markdownRemark: {
          html: content,
          frontmatter: {
            title,
            date,
            description,
            curries
          }
        }
    },
    pageContext: {
      previous,
      next
    }
  }) {
  function PostHeader() {
    const PostTitle = useConstant(() => styled.h1`
      margin-top: ${rhythm(1)};
      margin-bottom: 0;
    `);
    function PostAdditionalInformation() {
      const PostDate = useConstant(() => styled.p`
        display: block;
        margin-bottom: ${rhythm(1)};
        ${scale(-1/5)};
      `);
      function PostCurries() {
        return (
          <p>{'🍛'.repeat(parseInt(curries))}</p>
        );
      }

      return (
        <Row>
          <PostDate>
            {date}
          </PostDate>
          <PostCurries />
        </Row>
      );
    }

    return (
      <>
        <PostTitle>
          {title}
        </PostTitle>
        <PostAdditionalInformation />
      </>
    );
  }
  function PostContent() {
    return (
      <Markdown>
        {content}
      </Markdown>
    );
  }
  function PostFooter({ previous, next }) {
    const StyledHr = useConstant(() => styled.hr`
      margin-bottom: ${rhythm(1)};
    `);
    const PostNavigatorDiv = styled.ul`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      list-style: none;
      padding-top: 0;
    `;
    function PostNavigator({ destinationPost, rel }) {
      return (
        <li>
          <HyperLink to={destinationPost.fields.slug} rel={rel}>
            {
              rel === 'prev' ?
                `← ${destinationPost.frontmatter.title}` :
                `${destinationPost.frontmatter.title} →`
            }
          </HyperLink>
        </li>
      );
    }
    function PreviousPostNavigator() {
      return (
        <PostNavigator destinationPost={previous} rel={'prev'} />
      );
    }
    function NextPostNavigator() {
      return (
        <PostNavigator destinationPost={next} rel={'next'} />
      );
    }
    function PostNavigation() {
      return (
        <PostNavigatorDiv>
          {previous && <PreviousPostNavigator />}
          {next && <NextPostNavigator />}
        </PostNavigatorDiv>
      );
    }

    return (
      <>
        <StyledHr />
        <Bio />
        <PostNavigation />
      </>
    );
  }

  return (
    <BaseLayout>
      <SEO title={title} description={description} />
      <PostHeader />
      <PostContent />
      <PostFooter previous={previous} next={next} />
    </BaseLayout>
  );
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        curries
      }
    }
  }
`;
