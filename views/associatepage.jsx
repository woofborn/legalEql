var React = require("react");
var Layout = require('./layout');
var Chart = require('chart.js');


class Associatepage extends React.Component {
  render() {

    let projects = "None!"

    if (this.props.projects != null){

        projects = this.props.projects.map((project,i)=>{
             return <li key = {i}><a href = {`/projects/${project.project_name}`}>{project.project_name}</a></li>
             })
    }

    let projectoptions;
     if (this.props.projects != null){

        projectoptions = this.props.projects.map((project,i)=>{
             return <option key = {i} value = {project.project_name}>{project.project_name}</option>
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

        <h2> Add billables </h2>
        <form method="POST" action="/billables">
            <input type ="date" name = "date"></input>
            <input placeholder = "number of hours" name = "hours"></input>
            <select name = "project">
                <option>Select Project</option>
                {projectoptions}
            </select>

            <input type = "submit" className = "btn btn-outline-dark"></input>
        </form>
        <br/>
        <h2>Billables per project</h2>


        <div>
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>

    <script src = "/projects.js"></script>
     </Layout>
    );
  }
}

module.exports = Associatepage;