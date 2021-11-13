import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <a
        href="https://github.com/heriswn"
        target="_blank"
        rel="noopener noreferrer"
        >
        github
        </a>
        <a
        href="/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        >
        rss
        </a>
        <div style={{ float: 'right' }}>
          <a href="https://github.com/heriswn/heri" target="_blank" rel="noopener noreferrer">
            source
          </a>
        </div>
      </footer>
    );
  }
}