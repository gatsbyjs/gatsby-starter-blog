import React from 'react';

import SEO from 'components/seo';
import BaseLayout from 'components/templates/BaseLayout';

export default function NotFoundPage() {
  function NotFoundMessage() {
    return (
      <>
        <h1>Not Found</h1>
        <p>
          Oops, My router function has produced
          {' '}
          <strong>
            <a href='https://wiki.haskell.org/Bottom'>⊥</a>
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