var React = require("react");
var Layout = require('./layout');

class Newmember extends React.Component {
  render() {




    return (
      <Layout>

       <h3> Success! You have added associate {this.props.associate} to Project {this.props.project}!</h3>


     </Layout>
    );
  }
}

module.exports = Newmember;