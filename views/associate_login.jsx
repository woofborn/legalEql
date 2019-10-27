
const React = require("react");
const Layout = require('./layout');

class Login extends React.Component {
    render() {


        let fail = ""
        if (this.props.fail === true){
            fail =  <div className="alert alert-danger" role="alert">Log in failed. Please try again.</div>
        }

         let login = ""
        if (this.props.login === false){
            fail =  <div className="alert alert-danger" role="alert">Please login as an associate to access the billables page.</div>
        }

        return (
             <Layout>

                <div className="box">
                <h1>WELCOME TO ANG, LOH AND WONG LLP</h1>
                <br/>
                <h2> Associate login.</h2>
                <form method="POST" action="/login/associates">
                    <div className="form-group">

                        <input className="form-control form-control-lg" type="text" placeholder="username" name="username" required/>
                    </div>

                    <div className="form-group">

                        <input className="form-control form-control-lg" type="text" placeholder="password" name="password" required/>
                    </div>

                    <input type="submit" className="btn btn-outline-danger" value="login"/>
                </form>
                <br/>
                <h3>{fail}</h3>
                <h3>{login}</h3>
                </div>
            </Layout>

        );
    };
};

module.exports = Login;