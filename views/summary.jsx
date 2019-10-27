var React = require("react");
var Layout = require('./layout');

const moment = require('moment')


class Summary extends React.Component {
  render() {
    let billed;
    let total;

    if (this.props.billables!=null){
        billed = this.props.billables.map((bill,i)=>{
            let time = moment(bill.updated).format("LL")
            return <tr>
                    <td>{time}</td>
                    <td>{bill.hours}</td>
                    </tr>

        });

        let totalObj = this.props.billables.reduce((x,y)=>{return{hours: x.hours + y.hours}})
        total = totalObj.hours

    }

    let date = moment(this.props.date).format("LL")
    return (
      <Layout>

        <h2> Your have inserted the following billable entry: </h2>
        <ul style = {{listStyleType: "none"}}>
            <li>Date: {date}</li>
            <li>Project: {this.props.project}</li>
            <li>Time spent (in hours): {this.props.hours}</li>
        </ul>

        <h2> Total time billed to Project {this.props.project}: {total}</h2>


        <h2> Summary of entries for Project {this.props.project}</h2>
         <table className = "table">
                <thead className = "thead-light">
                <tr>
                  <th>Date</th>
                  <th>Time Billed</th>
                </tr>
                </thead>
                <tbody>
                {billed}
                </tbody>
        </table>

     </Layout>
    );
  }
}

module.exports = Summary