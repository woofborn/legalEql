var React = require("react");
var Layout = require('./layout')

class Associates extends React.Component {
  render() {

         let selected = ""
            if (this.props.selected===true){
                selected =  <div className="alert alert-danger" role="alert">No, you already picked that one. Try again.</div>
            }

        if (this.props.associates.length>0) {

            var associate = this.props.associates.map((associate,i)=>{
                 return   <div key = {i} className="col-6">

                        <div  className="card">
                            <div className="card-body">

                                <h5 className="card-text"> {associate.aname} </h5>

                                    <div className="card-subtitle mb-2 text-muted">
                                        <div> Area: {associate.area}
                                        </div>
                                        <div> Office: {associate.location}
                                        </div>
                                        <br/>
                                         <form method="POST" action={"/projects/"+this.props.projectName+"/newmember"}>

                                             <input type="submit" className="btn btn-outline-primary" value="Add to team"></input>
                                             <input type = "hidden" name="project_associateid[]"value = {this.props.projectName}></input>
                                             <input type = "hidden" name="project_associateid[]" value= {associate.id}></input>

                                        </form>
                                    </div>

                            </div>
                        </div>
                    </div>
            });
        } else {
         associate= <div className="alert alert-danger" role="alert"> Have you considered hiring? </div>
        }



    return (
       <Layout>

            <div className="box">
              <h1>ASSOCIATES</h1>
                <h2>Choose wisely.</h2>
                 <h3>{selected}</h3>
            </div>

                <div className="box">
                     <div className="row">
                         {associate}
                     </div>
                    <br/>
                <div>
                <form action = {"/projects/" + this.props.projectName}><button type="submit" className="btn btn-dark" href={"/projects/" + this.props.projectName}>Back to Project {this.props.projectName}</button></form>
                </div>
                </div>
        </Layout>
    );
  }
}

module.exports = Associates