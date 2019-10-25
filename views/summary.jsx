var React = require("react");
var Layout = require('./layout');

const moment = require('moment')


class Summary extends React.Component {
  render() {

    let date = moment(this.props.date).format("LL")
    return (
      <Layout>

        <h2> Your have inserted the following billable entry: </h2>
        <ul style = {{listStyleType: "none"}}>
            <li>Date: {date}</li>
            <li>Project: {this.props.project}</li>
            <li>Time spent (in hours): {this.props.hours}</li>

        </ul>

     </Layout>
    );
  }
}

module.exports = Summary