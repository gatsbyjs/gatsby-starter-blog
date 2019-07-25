import React from 'react';
import styled from '@emotion/styled';

import { hyperLinkColor } from 'constants/palette';

export default function Markdown({ children }) {
  const MarkdownContainer = styled.div`
      & a {
        color: ${hyperLinkColor};
      }
  `;

  return (
    <MarkdownContainer dangerouslySetInnerHTML={{ __html: children }} />
  );
}