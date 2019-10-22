var React = require("react");
var Layout = require('./layout');


class Partner extends React.Component {
  render() {




    return (
      <Layout>
        <h1> Project {this.props.name} Overview </h1>
        <br/>

        <form method="GET" action="/associates">
            <input type="submit" className="btn btn-danger" value="Add team members"/>
        </form>

        <h4> Deal team: </h4>
            <ol>
                <li>{this.props.partner}</li>

            </ol>

        <div> </div>








     </Layout>
    );
  }
}

module.exports = Partner;