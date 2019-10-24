var React = require("react");
var Layout = require('./layout');



class Associatepage extends React.Component {
  render() {

    let projects = "None!"

    if (this.props.projectList.length>0){

        projects = this.props.projectList.map((project,i)=>{
             return <li key = {i}><a href = {`/projects/${project.name}`}>{project.name}</a></li>
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



     </Layout>
    );
  }
}

module.exports = Associatepage;