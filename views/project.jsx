var React = require("react");
var Layout = require('./layout');
var Associates = require ('./associates')


class Partner extends React.Component {
  render() {




    return (
      <Layout>
        <h1> Project {this.props.name} Overview </h1>
        <br/>


            <a type="submit" className="btn btn-danger" value="Add team members" href={"/associates/" + this.props.name}></a>




        <h4> Deal team: </h4>
            <ol>
                <li>{this.props.partner}</li>
            </ol>

        <div> </div>








     </Layout>
    );
  }
}

module.exports = Partner;