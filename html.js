import React from 'react'
import DocumentTitle from 'react-document-title'
import { link } from 'gatsby-helpers'
import { TypographyStyle } from 'utils/typography'

export default class Html extends React.Component {
  render () {
    const { favicon, body } = this.props
    let title = DocumentTitle.rewind()
    if (this.props.title) {
      title = this.props.title
    }

    let cssLink
    if (process.env.NODE_ENV === 'production') {
      cssLink = <link rel="stylesheet" href={link('/styles.css')} />
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta
            name="viewport"
            content="user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0"
          />
          <title>{this.props.title}</title>
          <link rel="shortcut icon" href={favicon} />
          <TypographyStyle/>
          {cssLink}
        </head>
        <body className="landing-page">
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: body }} />
          <script src={link('/bundle.js')}/>
        </body>
      </html>
    )
  }
}

Html.propTypes = {
  body: React.PropTypes.string,
  favicon: React.PropTypes.string,
  title: React.PropTypes.string,
}

Html.defaultProps = { body: '' }
