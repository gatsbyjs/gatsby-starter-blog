import React from 'react';

import SEO from 'templates/SEO';
import BaseLayout from 'templates/BaseLayout';
import HyperLink from 'components/molecules/HyperLink';
import { Text, H1Text } from 'components/atoms/Text';
import Accent from 'components/atoms/Accent';

export default function NotFoundPage() {
  function NotFoundMessage() {
    return (
      <>
        <H1Text>Not Found</H1Text>
        <Text>
          Oops, My router function has produced
          {' '}
          <Accent>
            <HyperLink to='https://wiki.haskell.org/Bottom'>⊥</HyperLink>
          </Accent>,
          You should check your URI parameters.
        </Text>
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