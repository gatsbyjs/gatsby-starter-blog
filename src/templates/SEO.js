import React from 'react';

import Helmet from 'react-helmet';

import useSiteMetadata from 'utils/useSiteMetadata';

export default function SEO({ description, lang = 'en', meta = [], title }) {
  const { description: siteDescription, author, title: siteTitle } = useSiteMetadata();
  const metaDescription = description || siteDescription;

  return (
    <Helmet
      htmlAttributes={
        {
        lang,
        }
      }
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={
        [
          {
            name: 'description',
            content: metaDescription,
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            property: 'og:description',
            content: metaDescription,
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            name: 'twitter:card',
            content: 'summary',
          },
          {
            name: 'twitter:creator',
            content: author,
          },
          {
            name: 'twitter:title',
            content: title,
          },
          {
            name: 'twitter:description',
            content: metaDescription,
          },
          ...meta
        ]
      }
    />
  );
};
