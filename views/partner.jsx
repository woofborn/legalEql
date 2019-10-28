var React = require("react");
var Layout = require('./layout');



class Partner extends React.Component {
  render() {

    let projects = "None!"

    if (this.props.project.length>0){
        projects = this.props.project.map((project,i)=>{
            if (project.sum != null){
                 return <div style = {{position:"relative"}}><li key = {i}>
                 <a className = "stretched-link" href = {`/projects/${project.name}`}>{project.name}</a>
                 </li>
                 <p>Description: {project.description}</p>
                 <p>Total billed time: {project.sum} hours</p>
                 </div>
            } else {
                return <div style = {{position:"relative"}}><li key = {i}>
                 <a className = "stretched-link" href = {`/projects/${project.name}`}>{project.name}</a>
                 </li>
                 <p>Description: {project.description}</p>
                 <p>Total billed time: Nothing yet!</p>
                 </div>
            }
        })
    }


    let completed = "Still working on everything!";

    if (this.props.completed.length>0){
        completed = this.props.completed.map((completed,i)=>{
            return <li key={i}>
            {completed.name}
            </li>
        })
    }
        let unique;

         if (this.props.unique === false){
                unique =  <div className="alert alert-danger" role="alert">Be more creative - that one's been taken.</div>
        }

    return (
      <Layout>
        <h1> Welcome, {this.props.name}! </h1>
        <br/>
        <div className="box">
        <h2> Your active projects: </h2>
            <ol>
                {projects}
            </ol>
        <h2> Your completed projects: </h2>
            <ol>
                {completed}
            </ol>


        <h2> Add new project: </h2>

            <div>
                <form method="POST" action="/projects">
                    <div className="form-group">
                        <input className="form-control form-control-lg" type="text" placeholder="Type project name." name="name" style={{textTransform: "capitalize"}} required/>
                        <br/>
                        <input className="form-control form-control-lg" type="text" placeholder="Brief summary of project." name="summary" maxLength="150" required/>

                    </div>

                    <input type="submit" className="btn btn-danger" value="Add project"/>
                </form>
                <h3>{unique}</h3>
            </div>
            </div>
              <script src="/projects.js"></script>
     </Layout>
    );
  }
}

module.exports = Partner;