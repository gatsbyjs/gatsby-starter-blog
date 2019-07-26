import React from 'react';
import styled from '@emotion/styled';

import { hyperLinkColor, textColor } from 'constants/palette';
import { accentColor } from 'constants/palette';

export default function Markdown({ children }) {
  const MarkdownContainer = styled.div`
      a {
        color: ${hyperLinkColor};
      }
      p, span, small, h1, h2, h3, h4, h5, h6 {
        color: ${textColor};
      }
      strong {
        color: ${accentColor}
      }
      hr {
        background-color: ${textColor};
      }
  `;

  return (
    <MarkdownContainer dangerouslySetInnerHTML={{ __html: children }} />
  );
}