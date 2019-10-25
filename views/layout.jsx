const React = require('react');

class Layout extends React.Component {
    render() {



        return (
           <html>
                <head>
                      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>
                     <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js"></script>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                    <link rel = "stylesheet" href = "/style.css"></link>
                    <title>ALW LLP</title>
                </head>
                <body>
                    <div className="container">

                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <span className="navbar-brand">ALW</span>
                            <ul className="nav mr-auto mt-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/projects">My Projects</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/billables">My Billables</a>
                                </li>

                                <form method="GET" action="/logout" className="mr-3">
                                    <input type="submit" className="btn btn-outline-primary" value="logout"/>
                                </form>

                            </ul>

                        </nav>

                        <div className="jumbotron">
                        {this.props.children}
                        </div>
                    </div>
                </body>
            </html>
        );
    };
};

module.exports = Layout;