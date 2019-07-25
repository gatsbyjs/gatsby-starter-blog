import React from 'react';
import styled from '@emotion/styled';

import { hyperLink as hyperLinkColor } from 'constants/palette';

export default function Markdown({ children }) {
  const MarkdownContainer = styled.div`
      & a {
        ${hyperLinkColor}
      }
  `;

  return (
    <MarkdownContainer dangerouslySetInnerHTML={{ __html: children }} />
  );
}