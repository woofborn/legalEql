const React = require('react');

class Layout extends React.Component {
    render() {



        return (
           <html>
                <head>

                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                    <link rel = "stylesheet" href = "/style.css"></link>
                     <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>
                     <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js"></script>
                    <title>ALW LLP</title>
                </head>
                <body>
                <div className="bg">


                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                         <div className="container">
                            <span className="navbar-brand" id="brandname">ALW</span>

                                    <ul className="nav mt-lg-0">
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
                                            <input type="submit" className="btn btn-outline-danger" value="logout"/>
                                        </form>

                                    </ul>



                        </div>

                    </nav>

                        <div className="container" id="main">
                        {this.props.children}
                        </div>
                    </div>

                </body>
            </html>
        );
    };
};

module.exports = Layout;