var React = require("react");
var Layout = require('./layout');
var Newproject = require('./addproject')

class Partner extends React.Component {
  render() {




    return (
      <Layout>
        <h1> Welcome, {this.props.name}! </h1>
        <br/>
        <h2> Your projects: </h2>

        <div>. </div>

        <h2> Add new project: </h2>

        <Newproject/>




     </Layout>
    );
  }
}

module.exports = Partner;