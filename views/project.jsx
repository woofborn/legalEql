var React = require("react");
var Layout = require('./layout');
var Associates = require ('./associates')


class Project extends React.Component {
  render() {

    if(this.props.associates != undefined){

        var associateList = this.props.associates.map((associate,i)=>{
           return <li key={i}>{associate}</li>
        })
    }
    return (
      <Layout>
        <h1> Project {this.props.name} Overview </h1>
        <br/>

            <a type="submit" className="btn btn-danger" value="Add team members" href={"/associates/" + this.props.name}>Add team members</a>

        <h4> Deal team: </h4>
            <ol>
            <h5>Partner</h5>
                <li>{this.props.partner}</li>
            <h5>Associates</h5>
                {associateList}
            </ol>

        <div> </div>








     </Layout>
    );
  }
}

module.exports = Project;