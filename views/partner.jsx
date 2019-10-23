var React = require("react");
var Layout = require('./layout');
var Newproject = require('./addproject')


class Partner extends React.Component {
  render() {

 let unique = ""
        if (this.props.unique === false){
            unique =  <h3 style = {{color:"red"}}>Be more creative - that one's been taken.</h3>
        }


    return (
      <Layout>
        <h1> Welcome, {this.props.name}! </h1>
        <br/>
        <h2> Your projects: </h2>

        <div>. </div>

        <h2> Add new project: </h2>

        <Newproject/>

        <h3>{unique}</h3>




     </Layout>
    );
  }
}

module.exports = Partner;