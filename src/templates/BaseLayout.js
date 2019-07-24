import React from 'react';
import styled from '@emotion/styled';

import { Link } from 'gatsby';

import useSiteMetadata from 'utils/useSiteMetadata';
import useConstant from 'utils/useConstant';

import { rhythm, scale } from 'utils/typography';

export default function BaseLayout({ children }) {
  const BaseLayoutDiv = useConstant(() => styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: ${rhythm(24)};
    padding-top: ${rhythm(1.5)};
    padding-bottom: ${rhythm(3 / 4)};
  `);
  function BaseHeader() {
    const { title } = useSiteMetadata();
    const SiteTitle = useConstant(() => styled.h1`
      margin-bottom: ${rhythm(1.5)};
      margin-top: 0;
      ${scale(1.5)};
    `);
    const StyledLink = useConstant(() => styled(Link)`
      box-shadow: none;
      text-decoration: none;
      color: inherit;
    `);

    return (
      <SiteTitle>
        <StyledLink to='/'>
          {title}
        </StyledLink>
      </SiteTitle>
    );
  }
  function BaseMain({ children }) {
    return (
      <main>
        {children}
      </main>
    );
  }
  function BaseFooter() {
    const { social: { github, twitter } } = useSiteMetadata();

    return (
      <footer>
        <a href={github}>Github</a>
        /
        <a href={twitter}>Twitter</a>
      </footer>
    );
  }

  return (
    <BaseLayoutDiv>
      <BaseHeader />
      <BaseMain>
        {children}
      </BaseMain>
      <BaseFooter />
    </BaseLayoutDiv>
  );
}