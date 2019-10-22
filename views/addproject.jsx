
const React = require("react");
const Layout = require('./layout');

class Addproject extends React.Component {
    render() {


        return (


            <div>
                <form method="POST" action="/projects">
                    <div className="form-group">
                        <label>Project name: </label>
                        <input className="form-control form-control-lg" type="text" placeholder="e.g. Project Deathstar" name="name" required/>
                    </div>

                    <input type="submit" className="btn btn-danger" value="Add project"/>
                </form>
            </div>


        );
    };
};

module.exports = Addproject;