var React = require("react");
var Layout = require('./layout');



class Associatepage extends React.Component {
  render() {

    let projects = "None!"

    if (this.props.projects.length>0){

        projects = this.props.projects.map((project,i)=>{
             return <li key = {i}><a href = {`/projects/${project.project_name}`}>{project.project_name}</a></li>
             })
    }



    return (
      <Layout>
        <h1> Welcome, {this.props.name}! </h1>
        <br/>
        <h2> Your active projects: </h2>
            <ol>
                {projects}
            </ol>

        <h2> Your billables </h2>
        <form>
            <input type ="date"></input>
            <input placeholder = "number of hours"></input>

            <input type = "submit" className = "btn"></input>
        </form>



     </Layout>
    );
  }
}

module.exports = Associatepage;