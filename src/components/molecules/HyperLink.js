import React from 'react';
import styled from '@emotion/styled';

import { Link as GatsbyLink } from 'gatsby';

import { hyperLinkColor } from 'constants/palette'

export default function HyperLink({ to, children }) { // TODO: remove duplication of style
  function isInternalLink(link) {
    const regexp = /^\/(?!\/)/;

    return regexp.test(link);
  }
  function ExternalLink() {
    const StyledA = styled.a`
      box-shadow: none;
      text-decoration: none;
      color: ${hyperLinkColor};
    `;

    return (
      <StyledA href={to}>
        {children}
      </StyledA>
    );
  }
  function InternalLink() {
    const StyledGatsbyLink = styled(GatsbyLink)`
      box-shadow: none;
      text-decoration: none;
      ${hyperLinkColor}
    `;

    return (
      <StyledGatsbyLink to={to}>
        {children}
      </StyledGatsbyLink>
    );
  }
  const Link = isInternalLink(to) ? InternalLink : ExternalLink;

  return (
    <Link />
  );
}