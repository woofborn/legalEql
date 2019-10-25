var React = require("react");
var Layout = require('./layout');


class Summary extends React.Component {
  render() {

    return (
      <Layout>
        <h1> Welcome, {this.props.name}! </h1>
        <br/>
        <h2> Your active projects: </h2>
            <ol>
                {projects}
            </ol>

        <h2> Add billables </h2>
        <form method="POST" action="/billables">
            <input type ="date" name = "date"></input>
            <input placeholder = "number of hours" name = "hours"></input>
            <select name = "project">
                <option>Select Project</option>
                {projectoptions}
            </select>

            <input type = "submit" className = "btn btn-outline-dark"></input>
        </form>

        <a href = "" className = "btn btn-danger">Your billables summary</a>
     </Layout>
    );
  }
}

module.exports = Summary