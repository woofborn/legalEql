var React = require("react");
var Layout = require('./layout');
var Associates = require ('./associates')


class Project extends React.Component {
  render() {

    var partnerName = this.props.partner
    if(this.props.team === undefined){
        console.log(partnerName)
    } else if (this.props.team.length>0) {
        partnerName = this.props.team[0].pname
        var associateList = this.props.team.map((associate,i)=>{
           return <li key={i}>{associate.aname}</li>
        })
    }
    return (
      <Layout>
        <h1> Project {this.props.name} Overview </h1>
        <br/>
            <div>
            <a type="submit" className="btn btn-danger" value="Add team members" href={"/associates/" + this.props.name}>Add team members</a>
            </div>

        <br/>
        <h4> Deal team: </h4>
        <br/>
            <ol>
            <h5>Partner</h5>
                <li>{partnerName}</li>
            <br/>
            <h5>Associates</h5>
                {associateList}
            </ol>

        <div> </div>








     </Layout>
    );
  }
}

module.exports = Project;