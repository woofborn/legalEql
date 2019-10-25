
const React = require("react");
const Layout = require('./layout');

class Login extends React.Component {
    render() {

        return (

            <html>
                <head>

                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                    <link rel = "stylesheet" href = "/style.css"></link>
                    <title>ALW LLP</title>
                </head>

                <body>
                <div className = "bg">
                <div className = "jumbotron">
                    <div className = "jumbotron">
                        <h1>WELCOME TO ANG, LOH AND WONG LLP</h1>

                        <h2> Please select login.</h2>

                            <a type="submit" className="btn btn-light" value="Partner" href="/login">Partner</a>

                            <a type="submit" className="btn btn-dark" value="Associate" href="/login/associates">Associate</a>

                    </div>
                </div>
                </div>

                </body>
            </html>



        );
    };
};

module.exports = Login;