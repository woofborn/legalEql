
const React = require("react");
const Layout = require('./layout');

class Login extends React.Component {
    render() {


        let fail = ""
        if (this.props.fail === true){
            fail =  <h3 style = {{color:"red"}}>Log in failed. Please try again.</h3>
        }

         let login = ""
        if (this.props.login === false){
            fail =  <h3 style = {{color:"red"}}>Please login to access projects page.</h3>
        }

        return (
             <Layout>

                <h1>WELCOME TO ANG, LOH AND WONG LLP</h1>

                <h2> Please login.</h2>
                <form method="POST" action="/login">
                    <div className="form-group">
                        <label>Username: </label>
                        <input className="form-control form-control-lg" type="text" placeholder="username" name="username" required/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-control form-control-lg" type="text" placeholder="password" name="password" required/>
                    </div>

                    <input type="submit" className="btn btn-danger" value="Login"/>
                </form>
                <br/>
                <h3>{fail}</h3>
                <h3>{login}</h3>
            </Layout>

        );
    };
};

module.exports = Login;