var React = require("react");
var Layout = require('./layout');
var Associates = require ('./associates')


class Project extends React.Component {
  render() {


    var partnerName = this.props.partner
    var associateList = "Nobody else - just you!"
    if(this.props.team === undefined){
        console.log(partnerName)
    } else if (this.props.team.length>0) {


        partnerName = this.props.team[0].pname

        associateList = this.props.team.map((associate,i)=>{
           return <div key={i}><li> {associate.aname}

            {this.props.cheese != undefined ? (  <form method="POST" action={"/associates/"+this.props.name}>
                 <input type="submit" className="btn btn-sm btn-outline-dark" href={"/associates/"+this.props.name+"/delete"} value = "Remove"></input>
                 <input type = "hidden" name="id_project[]"value={associate.id}></input>
                 <input type = "hidden" name="id_project[]"value={this.props.name}></input>
             </form>) : (<br/>)}



             </li>


                <br/>
                </div>
        })
    }

    return (
    <Layout>
        <div>
        {this.props.cheese != undefined ? ( <a type="submit" className="btn btn-success" href={"/projects/" + this.props.name + "/complete"}>Project Completed!</a>) : (<br/>)}

        </div>
         <br/>
        <div>
            <h1> Project {this.props.name} Overview </h1>
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

                <div>
                 {this.props.cheese != undefined ? ( <a type="submit" className="btn btn-danger" href={"/associates/" + this.props.name}>Add team members</a>) : (<br/>)}

                 </div>
        </div>
        <br/>
         <div>
                <a type="submit" className="btn btn-dark" href={"/projects"}>Back to My Projects</a>
                </div>

     </Layout>
    );
  }
}

module.exports = Project;