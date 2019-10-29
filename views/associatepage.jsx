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
             return <div  style = {{position:"relative", borderBottom: "1px solid black", marginTop:"1%"}}><li key = {i}><a className = "stretched-link" href = {`/projects/${project.project_name}`}>{project.project_name}</a></li><p>Description:{project.description}</p></div>;
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
       <div className = "box">
        <h1> Welcome, {this.props.name}! </h1>
        <br/>

        <div>
        <h3> Your active projects: </h3>
            <ol className="projectlist">
                {projects}
            </ol>
        </div>

        <div className = "inner-box">
        <h3> Add billables </h3>
        <form method="POST" action="/billables/summary">
            <input className = "shadow-sm p-1 mb- bg-white rounded" type ="date" name = "date" required></input>
            <input className = "shadow-sm p-1 mb-1 bg-white rounded" placeholder = "number of hours" name = "hours" required></input>
            <select name = "project" required>
                <option>Select Project</option>
                {projectoptions}
            </select>

            <input type = "submit" className = "btn btn-outline-primary"></input>
        </form>
        <br/>
        </div>
        </div>

        <div className = "box">
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


        <div style = {{marginTop:"5%"}}>
        <h3>Total Billed</h3>

        <div className="progress" style={{height:"40px"}}>
              <div className="progress-bar" valuemin="0" valuemax="100"role="progressbar" style={{width: `${this.props.percentage}%`, fontSize:"1.4em"}}>
                {this.props.percentage}% of annual target
              </div>
        </div>
        <br/>
        <p className="bigger"><span className="underline">{this.props.total.sum}</span> hours billed this year</p>
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