var React = require("react");
var Layout = require('./layout');

class Newmember extends React.Component {
  render() {




    return (
      <Layout>
      <div className="box">
           <h3> Success! You have added associate {this.props.associate} to Project {this.props.project}!</h3>
           <div>
                <a className="btn btn-dark" href={`/associates/${this.props.project}`}>add another team member to Project {this.props.project}</a>
            </div>
            <div>
                <a className="btn btn-primary" href={`/projects/${this.props.project}`}>back to Project {this.props.project}</a>
            </div>
        </div>
     </Layout>
    );
  }
}

module.exports = Newmember;