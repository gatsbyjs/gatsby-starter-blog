const React = require('react')
const DatePicker = require('./single-date-picker')
require('react-dates/css/variables.scss')
require('react-dates/css/styles.scss')

class Post extends React.Component {
  render () {
    return (
      <div>
        <h1>{this.props.route.page.data.title}</h1>
        <p>Word to the javascript yos</p>
        <p>This is the best I think</p>
        <p>Cause you can now do stuff like... embed a date picker in your blog posts!</p>
        <DatePicker />
        <br />
        <br />
        <p>(No doubt a secret dream of yours)</p>
      </div>
    )
  }
}

export default Post

exports.data = {
  title: "A post written in Javascript!",
  date: "2016-12-09T12:40:32.169Z",
}
