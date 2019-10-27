var React = require("react");
var Layout = require('./layout');
var Chart = require('chart.js');


class Associatepage extends React.Component {
  render() {

    let projects = "None!"
    let projectoptions;
    let billed;

    if (this.props.projects != null){

        projects = this.props.projects.map((project,i)=>{
             return <li key = {i}><a href = {`/projects/${project.project_name}`}>{project.project_name}</a></li>;
        })

         projectoptions = this.props.projects.map((project,i)=>{
             return <option key = {i} value = {project.project_name}>{project.project_name}</option>;
        })

    if (this.props.billables != null){
         billed = this.props.billables.map((bill,i)=>{

            return <tr>
                    <td>{bill.project_name}</td>
                    <td>{bill.sum}</td>
                    </tr>
                     })
    }
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
            <input type ="date" name = "date" required></input>
            <input placeholder = "number of hours" name = "hours" required></input>
            <select name = "project" required>
                <option>Select Project</option>
                {projectoptions}
            </select>

            <input type = "submit" className = "btn btn-outline-dark"></input>
        </form>
        <br/>

        {this.props.billables!=null? (<div><h2>Billables per project</h2>
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <div class="card">
                        <div class="card-body">
                             <canvas id="myChart" width="200" height="200"></canvas>
                        </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="card">
                        <div class="card-body">
                             <table className = "table table-sm">
                                    <thead className = "thead-light">
                                        <tr>
                                          <th>Project</th>
                                          <th>Billables</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billed}
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             </div>
        </div>
        </div>):(<br/>)}

        <h2>Total Billed</h2>
        <div class="progress">
              <div class="progress-bar progress-bar-success" role="progressbar" style={{width:"40%"}}>
                40% Complete (success)
              </div>
        </div>



     <script dangerouslySetInnerHTML={ {__html:
                          `var projects = '${JSON.stringify(this.props.projects)}';`
                      }}/>
                       <script dangerouslySetInnerHTML={ {__html:
                          `var billables = '${JSON.stringify(this.props.billables)}';`
                      }}/>
    <script src = "/projects.js"></script>

     </Layout>
    );
  }
}

module.exports = Associatepage;