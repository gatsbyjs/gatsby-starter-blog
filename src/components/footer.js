import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <ul>
          <li>
            <a
            href="https://github.com/heriswn"
            target="_blank"
            rel="noopener noreferrer"
            >Github</a>
          </li>
          <li>
            <a
            href="https://heri.gatsbyjs.io/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            >RSS</a>
          </li>
        </ul>
        <ul>
          <li>
            <a
            href="https://github.com/heriswn/heri"
            target="_blank"
            rel="noopener noreferrer"
            >Source</a>
          </li>
        </ul>
      </footer>
    );
  }
}