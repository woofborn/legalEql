
const React = require("react");
const Layout = require('./layout');

class Noassociates extends React.Component {
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
                    <h2 className="alert alert-danger" role="alert">ERROR 403:ACESS FORBIDDEN.</h2>
                    <h3>NO SPYING ON PARTNERS!</h3>
                </div>
                </div>

                </body>
            </html>



        );
    };
};

module.exports = Noassociates;