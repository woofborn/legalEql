var React = require("react");
var Layout = require('./layout');
var Newproject = require('./addproject')


class Partner extends React.Component {
  render() {

    let projects = "None!"

        console.log("RAWRAWRAWRAWRAWRAWRAW")
        console.log(this.props.projectList)

    if (this.props.projectList.length>0){

        projects = this.props.projectList.map((project,i)=>{
             return <li key = {i}><a href = {`/projects/${project.project_name}`}>{project.project_name}</a></li>
             })
    }


        let unique;

         if (this.props.unique === false){
                unique =  <h3 style = {{color:"red"}}>Be more creative - that one's been taken.</h3>
        }

    return (
      <Layout>
        <h1> Welcome, {this.props.name}! </h1>
        <br/>
        <h2> Your projects: </h2>
            <ol>
                {projects}
            </ol>


        <h2> Add new project: </h2>


            <div>
                <form method="POST" action="/projects">
                    <div className="form-group">
                        <label>Project name: </label>
                        <input className="form-control form-control-lg" type="text" placeholder="Type project name." name="name" style={{textTransform: "capitalize"}} required/>
                    </div>

                    <input type="submit" className="btn btn-danger" value="Add project"/>
                </form>
                <h3>{unique}</h3>
            </div>

     </Layout>
    );
  }
}

module.exports = Partner;