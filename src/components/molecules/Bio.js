import React from 'react';
import styled from '@emotion/styled';

import Image from 'gatsby-image';

import { useStaticQuery, graphql } from 'gatsby';
import useSiteMetadata from 'utils/useSiteMetadata';
import useConstant from 'utils/useConstant';

import { rhythm } from 'utils/typography'

export default function Bio() {
  const { file: { childImageSharp: { fixed: profileImage } } } = useStaticQuery(graphql`    
    query ProfileImage {
      file(absolutePath: { regex: "/profile.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const { author } = useSiteMetadata();
  const BioDiv = useConstant(() => styled.div`
    display: flex;
    margin-bottom: ${rhythm(2.5)};
  `);
  const ProfileImage = useConstant(() => styled(Image)`
    margin-right: ${rhythm(1/2)};
    margin-bottom: 0;
    min-width: 50px;
    border-radius: 100%;
    & > img {
      border-radius: 50%;
    }
  `);
  function BioIntroduction() {
    return (
      <p>
        Personal blog of <strong>{author}</strong>.
        <br />
        I believe that knowledge becomes valuable when we share it with others.
      </p>
    );
  }

  return (
    <BioDiv>
      <ProfileImage
        fixed={profileImage}
        alt={author}
      />
      <BioIntroduction />
    </BioDiv>
  );
};
