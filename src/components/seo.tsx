/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

type SeoProps = {
  description?: string;
  title: string;
  children?: React.ReactNode;
};

const Seo: React.FC<SeoProps> = ({ description, title, children }) => {
  const { site } = useStaticQuery<{
    site: {
      siteMetadata: {
        title?: string;
        description?: string;
        social?: {
          x?: string;
        };
      };
    };
  }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              x
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="x:card" content="summary" />
      <meta
        name="x:creator"
        content={site.siteMetadata?.social?.x || ``}
      />
      <meta name="x:title" content={title} />
      <meta name="x:description" content={metaDescription} />
      {children}
    </>
  );
};

export default Seo;
