import React from 'react';

import SEO from 'templates/SEO';
import BaseLayout from 'templates/BaseLayout';
import HyperLink from 'components/molecules/HyperLink';

export default function NotFoundPage() {
  function NotFoundMessage() {
    return (
      <>
        <h1>Not Found</h1>
        <p>
          Oops, My router function has produced
          {' '}
          <strong>
            <HyperLink to='https://wiki.haskell.org/Bottom'>⊥</HyperLink>
          </strong>,
          You should check your URI parameters.
        </p>
      </>
    );
  }

  return (
    <BaseLayout>
      <SEO title='404: Not Found' />
      <NotFoundMessage />
    </BaseLayout>
  );
};