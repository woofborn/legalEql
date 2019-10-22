var React = require("react");
var Layout = require('./layout')

class Index extends React.Component {
  render() {
          const associate = this.props.associates.map((associate,i)=>{

            return   <div className="col-6">

                        <div key = {i} className="card">
                            <div className="card-body">

                                <h5 className="card-text"> {associate.name} </h5>

                                    <div className="card-subtitle mb-2 text-muted">
                                        <div> location/area of focus/whatever
                                        </div>
                                        <br/>
                                         <form method="POST" action={"#"}>
                                         <button type="submit" className="btn btn-light" value="Add">Add to team</button>

                                        </form>
                                    </div>

                            </div>
                        </div>
                    </div>



    });
    return (
       <Layout>



              <h1>ASSOCIATES</h1>
                <h2>Choose wisely.</h2>
                <br/>
                     <div className="row">
                         {associate}
                     </div>
        </Layout>
    );
  }
}

module.exports = Index;