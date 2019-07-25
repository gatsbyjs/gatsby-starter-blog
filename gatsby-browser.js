import 'typeface-montserrat';
import 'typeface-merriweather';
import 'prismjs/themes/prism-okaidia.css';

import React from 'react';

import AppEnvironment from 'components/atoms/AppEnvironment';

export function wrapRootElement({ element }) {
  return (
    <AppEnvironment>
      {element}
    </AppEnvironment>
  );
}