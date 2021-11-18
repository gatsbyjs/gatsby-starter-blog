import { Link } from 'gatsby';
import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <ul>
          <li>
            <Link
            href="https://github.com/heriswn"
            target="_blank"
            rel="noopener noreferrer"
            >Github</Link>
          </li>
          <li>
            <Link
            href="https://gatsbyimprovedstarterblog.gatsbyjs.io/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            >RSS</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
            href="https://github.com/heriswn/gatsby-improved-starter-blog"
            target="_blank"
            rel="noopener noreferrer"
            >Source</Link>
          </li>
        </ul>
      </footer>
    );
  }
}