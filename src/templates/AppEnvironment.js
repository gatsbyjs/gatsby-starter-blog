import React from 'react';
import { Global, css } from '@emotion/core';

import { backgroundColor, textColor } from 'constants/palette';

export default function AppEnvironment({ children }) {
  return (
    <>
      <Global
        styles={
          css`
           :root {
              background-color: ${backgroundColor};
            }
            hr {
              background-color: ${textColor};
            }
          `
        }
      />
      {children}
    </>
  );
};