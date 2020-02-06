import React from "react";
import PropTypes from "prop-types";
import { InstantSearch, SearchBox, Hits, Stats, Pagination } from "react-instantsearch/dom";

import Hit from "./Hit";

const Search = props => {
  const { algolia, theme } = props;

  return (
    <React.Fragment>
      <div className="search">
        {algolia &&
          algolia.appId && (
            <InstantSearch
              appId={algolia.appId}
              apiKey={algolia.searchOnlyApiKey}
              indexName={algolia.indexName}
            >
              <SearchBox translations={{ placeholder: "Search" }} />
              <Stats />
              <Hits hitComponent={Hit} />
              <Pagination />
            </InstantSearch>
          )}
      </div>

      {/* --- STYLES --- */}
      <style jsx global>{`
        .ais-SearchBox {
          width: 100%;
        }
        .ais-SearchBox-form {
          position: relative;
          border-bottom: 1px solid #aaa;
          display: flex;
          justify-content: space-between;
        }
        .ais-SearchBox-input {
          border: none;
          padding: 0.2em;
          font-size: 1.4em;
          flex-grow: 1;
        }
        .ais-SearchBox-submit,
        .ais-SearchBox-reset {
          background: none;
          border: none;
          fill: #666;
          flex-grow: 0;
        }
        .ais-Stats {
          margin: 0.5em 0 2em 0.3em;
          font-size: 0.9em;
          color: #999;
          display: block;
        }
        .ais-Hits-list {
          list-style: none;
          padding: 0;
        }
        .ais-Pagination-list {
          display: flex;
          list-style: none;
          justify-content: center;
          padding: 0;
        }
        .ais-Pagination-item a,
        .ais-Pagination-item span {
          color: #666;
          font-size: 1.2em;
          display: block;
          padding: 0.5em 0.5em 2em;
        }
        .ais-Pagination-item a:hover {
          color: red;
        }
        .ais-Pagination-item.ais-Pagination-item--firstPage a,
        .ais-Pagination-item.ais-Pagination-item--previousPage a,
        .ais-Pagination-item.ais-Pagination-item--nextPage a {
          padding: 0.4em 0.5em 0.6em;
        }
      `}</style>
    </React.Fragment>
  );
};

Search.propTypes = {
  algolia: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Search;
