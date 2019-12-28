import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h4
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              display: 'inline-block',
              color: '#979899'
            }}
            to={`/`}
          >
            <svg
              style={{ verticalAlign: 'middle' }}
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="#979899"
                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              />
            </svg>{' '}
            back
          </Link>
        </h4>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          <a
            href="https://github.com/vnoitkumar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GitHub
          </a>
          {' | '}
          <a
            href="https://twitter.com/vnoitkumar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            Twitter
          </a>
          {' | '}
          <a
            href="https://stackoverflow.com/users/5154807/vnoitkumar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Stack Overflow"
          >
            Stack Overflow
          </a>
        </footer>
      </div>
    );
  }
}

export default Layout;
