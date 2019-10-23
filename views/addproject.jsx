
const React = require("react");
const Layout = require('./layout');

class Addproject extends React.Component {
    render() {
        let unique;
         if (this.props.unique === false){
                unique =  <h3 style = {{color:"red"}}>Be more creative - that one's been taken.</h3>
            }

        return (


            <div>
                <form method="POST" action="/projects">
                    <div className="form-group">
                        <label>Project name: </label>
                        <input className="form-control form-control-lg" type="text" placeholder="Type project name." name="name" style={{textTransform: "capitalize"}} required/>
                    </div>

                    <input type="submit" className="btn btn-danger" value="Add project"/>
                </form>
                <h3>{unique}</h3>
            </div>


        );
    };
};

module.exports = Addproject;