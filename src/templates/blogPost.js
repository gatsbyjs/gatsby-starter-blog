import React from 'react';
import styled from '@emotion/styled';

import { Link, graphql } from 'gatsby';
import Bio from 'components/molecules/bio';
import SEO from 'components/seo';
import BaseLayout from 'templates/BaseLayout';
import useConstant from 'utils/useConstant';

import { rhythm, scale } from 'utils/typography';

export default function Post(
  {
    data: {
        markdownRemark: {
          html,
          frontmatter: {
            title,
            date,
            description
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
    const PostDate = useConstant(() => styled.p`
      display: block;
      margin-bottom: ${rhythm(1)};
      ${scale(-1/5)};
    `);

    return (
      <>
        <PostTitle>
          {title}
        </PostTitle>
        <PostDate>
          {date}
        </PostDate>
      </>
    );
  }
  function PostContent() {
    return (
      <div dangerouslySetInnerHTML={{ __html: html }} />
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
          <Link to={destinationPost.fields.slug} rel={rel}>
            {
              rel === 'prev' ?
                `← ${destinationPost.frontmatter.title}` :
                `${destinationPost.frontmatter.title} →`
            }
          </Link>
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
      }
    }
  }
`;
