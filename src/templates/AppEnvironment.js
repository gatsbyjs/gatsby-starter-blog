import React from 'react';
import { Global, css } from '@emotion/core';

import { backgroundColor } from 'constants/palette';

export default function AppEnvironment({ children }) {
  return (
    <>
      <Global
        styles={
          css`
           :root {
              background-color: ${backgroundColor};
            }
          `
        }
      />
      {children}
    </>
  );
};