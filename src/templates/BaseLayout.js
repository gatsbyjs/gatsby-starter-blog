import React from 'react';
import styled from '@emotion/styled';

import HyperLink from 'components/molecules/HyperLink';
import Row from 'templates/Row';
import Accent from 'components/atoms/Accent';
import { H1Text } from 'components/atoms/Text';

import useSiteMetadata from 'utils/useSiteMetadata';
import useConstant from 'utils/useConstant';

import { rhythm, scale } from 'utils/typography';

export default function BaseLayout({ children }) {
  const BaseLayoutDiv = useConstant(() => styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: ${rhythm(24)};
    padding-top: ${rhythm(1.5)};
    padding-bottom: ${rhythm(3/4)};
    padding-left: ${rhythm(3/4)};
    padding-right: ${rhythm(3/4)};
  `);
  function BaseHeader() {
    const { title } = useSiteMetadata();
    const SiteTitle = useConstant(() => styled(H1Text)`
      margin-top: 0;
      margin-bottom: ${rhythm(1.0)};
      ${scale(1)};
      @media (min-width: 420px) {
        margin-bottom: ${rhythm(1.5)};
        ${scale(1.5)};
      }
    `);

    return (
      <HyperLink to='/'>
        <SiteTitle>
          <Accent>
            {title}
          </Accent>
        </SiteTitle>
      </HyperLink>
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
    const { social: { github, twitter, facebook } } = useSiteMetadata();

    return (
      <Row>
        <HyperLink to={github}>Github</HyperLink>
        <HyperLink to={twitter}>Twitter</HyperLink>
        <HyperLink to={facebook}>Facebook</HyperLink>
      </Row>
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