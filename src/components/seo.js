/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, image, siteUrl, fb_appid }) {
  const { site } = useStaticQuery(
      graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            image
            siteUrl
            fb_appid
            
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaimage = image || site.siteMetadata.image
  const url = siteUrl || site.siteMetadata.siteUrl
  const fbid = fb_appid || site.siteMetadata.fb_appid
  return (
      <Helmet
          htmlAttributes={{
            lang,
          }}
          title={title}
          titleTemplate={`%s | ${site.siteMetadata.title}`}
          meta={[
            {
              name: `description`,
              content: metaDescription,
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: metaDescription,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              property: `og:image`,
              content: metaimage,
            },
              {
              property: `og:url`,
              content: url,
            }
            ,{
              property: `fb:app_id`,
              content: fbid,
            }
            ,
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:creator`,
              content: site.siteMetadata.author,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:description`,
              content: metaDescription,
            },
          ].concat(meta)}
      />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
