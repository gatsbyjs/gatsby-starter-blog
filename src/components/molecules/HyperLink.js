import React from 'react';
import styled from '@emotion/styled';

import { Link as GatsbyLink } from 'gatsby';

import { hyperLinkColor } from 'constants/palette'

export default function HyperLink({ to, children }) {
  const LinkStyle = styled.div`
     box-shadow: none;
     text-decoration: none;
     color: ${hyperLinkColor};
   `;
  function isInternalLink(link) {
    const regexp = /^\/(?!\/)/;

    return regexp.test(link);
  }
  function ExternalLink() {
    const StyledA = LinkStyle.withComponent('a');

    return (
      <StyledA href={to}>
        {children}
      </StyledA>
    );
  }
  function InternalLink() {
    const StyledGatsbyLink = LinkStyle.withComponent(GatsbyLink);

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