import React from 'react';
import { Global, css } from '@emotion/core';

import { background as backgroundColor, text as textColor } from 'constants/palette';

export default function AppEnvironment({ children }) {
  return (
    <>
      <Global
        styles={
          css`
           :root {
              ${backgroundColor}
            }
            p, span, small, h1, h2, h3, h4, h5, h6 {
              ${textColor}
            }
          `
        }
      />
      {children}
    </>
  );
};