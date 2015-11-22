import React from 'react';
import { Link } from 'react-router';
import { prune, include as includes } from 'underscore.string';
import find from 'lodash/collection/find';
import { rhythm, fontSizeToMS } from 'utils/typography'
import { link } from 'gatsby-helpers'

export default class extends React.Component {
  render() {
    let body, html, nextPost, readNext;
    readNext = this.props.post.readNext;
    if (readNext != null) {
      nextPost = find(this.props.pages, function(page) {
        return includes(page.path, readNext.slice(1, -1));
      });
    }
    if (!nextPost) {
      return React.createElement("noscript", null);
    } else {
      nextPost = find(this.props.pages, function(page) {
        return includes(page.path, readNext.slice(1, -1));
      });
      // Create pruned version of the body.
      html = nextPost.data.body;
      body = prune(html.replace(/<[^>]*>/g, ''), 200);

      return (
        <div>
          <h6
            style={{
              margin: 0,
              fontSize: fontSizeToMS(-1).fontSize,
              lineHeight: fontSizeToMS(-1).lineHeight,
              letterSpacing: -0.5
            }}
          >
            READ THIS NEXT:
          </h6>
          <h3
            style={{
              marginBottom: rhythm(1/4)
            }}
          >
            <Link
              to={nextPost.path}
              query={{readNext: true}}
            >
              {nextPost.data.title}
            </Link>
          </h3>
          <p>{body}</p>
          <hr />
        </div>
      );
    }
  }
}
