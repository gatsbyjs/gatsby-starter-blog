import React from 'react';

module.exports = React.createClass({
  render: function() {
    var html;
    html = "<div>fix me</div>";
    return (
      <div dangerouslySetInnerHTML={{__html: html}}/>
    );
  }
});
