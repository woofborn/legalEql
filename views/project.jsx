var React = require("react");
var Layout = require('./layout');
var Associates = require ('./associates')


class Project extends React.Component {
  render() {

    var summary = this.props.project.description
    console.log(summary)
    var partnerName = this.props.partner
    var associateList = "Nobody else - just you!"
    if(this.props.team === undefined){
        console.log(partnerName)
    } else if (this.props.team.length>0) {


        partnerName = this.props.team[0].pname

        associateList = this.props.team.map((associate,i)=>{
           return <div key={i}><li> {associate.aname}</li>
           <ul className = "list-unstyled"><li> Office: {associate.location}</li><li> Area: {associate.area}</li></ul>

            {this.props.cheese != undefined ? (  <form method="POST" action={"/associates/"+this.props.name}>
                 <input type="submit" className="btn btn-sm btn-outline-dark" href={"/associates/"+this.props.name+"/delete"} value = "Remove"></input>
                 <input type = "hidden" name="id_project[]"value={associate.id}></input>
                 <input type = "hidden" name="id_project[]"value={this.props.name}></input>
             </form>) : (<br/>)}

                <br/>
                </div>
        })

        let insufficient;
        if (this.props.insufficient===true){
            insufficient = <div className="alert alert-danger" role="alert">Sorry, insufficient associates to fulfil request.</div>
        }
    }

    return (
    <Layout>

    <div className = "box">

        <div style = {{float:"right"}}>
        {this.props.cheese != undefined ? ( <form action = {"/projects/" + this.props.name + "/complete"}><button type="submit" className="btn btn-success" href={"/projects/" + this.props.name + "/complete"}>Project Completed!</button></form>) : (<br/>)}

        </div>

         <br/>

            <h1> Project {this.props.name} Overview </h1>
            <br/>
            <h3>Description:</h3>
            <p>{summary}</p>
    </div>

    <div className = "box">
         <div style = {{float:"right"}}>
             {this.props.cheese != undefined ? (  <form action = {"/projects"}><button type="submit" className="btn btn-dark" href={"/projects"}>Back to My Projects</button></form>) : ( <form action = {"/billables"}><button type="submit" className="btn btn-outline-dark" href={"/billables"}>Back to My Billables</button></form>)}

                </div>
            <h4> Deal team: </h4>
            <br/>

                <h5>Partner:</h5>
                <ol>
                <li className="list-unstyled">{partnerName}</li>
                </ol>
                <br/>

                <h5>Associates:</h5>
                <ol>
                   <div>
                 {this.props.cheese != undefined ? ( <form method="POST" action = {"/associates/" + this.props.name + "/auto"}><button type="submit" className="btn btn-danger" id="generateButt">Generate team</button><input name = "location" placeholder="location" id="generateInput1" required></input><input name = "associates" placeholder="# of associates" id="generateInput2" required></input></form>) : (<br/>)}
                 </div>

                    {associateList}

                <div>
                 {this.props.cheese != undefined ? ( <form action = {"/associates/" + this.props.name}><button type="submit" className="btn btn-danger"href={"/associates/" + this.props.name} id="addButt" disabled>Add team members</button></form>) : (<br/>)}
                 </div>
                   </ol>
                 <br/>

        <br/>

        </div>




        <script dangerouslySetInnerHTML={ {__html:
                          `var team = '${JSON.stringify(this.props.team)}';`
                      }}/>

    <script src = "/projects.js"></script>
     </Layout>
    );
  }
}

module.exports = Project;