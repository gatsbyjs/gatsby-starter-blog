import React from 'react';
import styled from '@emotion/styled';

import Image from 'gatsby-image';
import Text from 'components/atoms/Text';
import Accent from 'components/atoms/Accent';

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
    margin-bottom: ${rhythm(1)};
    @media (min-width: 420px) {
      margin-bottom: ${rhythm(2.5)};
    }
  `);
  const ProfileImage = useConstant(() => styled(Image)`
    margin-right: ${rhythm(1/2)};
    margin-bottom: 0;
    min-width: 50px;
    border-radius: 100%;
    > img {
      border-radius: 50%;
    }
  `);
  function BioIntroduction() {
    return (
      <Text>
        Personal blog of <Accent>{author}</Accent>.
        <br />
        I believe that knowledge becomes valuable when we share it with others.
      </Text>
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
