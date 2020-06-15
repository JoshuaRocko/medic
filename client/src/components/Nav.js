import React from "react";
import "./styles/Nav.css";
import { Link, withRouter } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      session: localStorage.getItem("username"),
      idSession: localStorage.getItem("idUser"),
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.goFavs = this.goFavs.bind(this);
    this.goHist = this.goHist.bind(this);
  }

  goFavs() {
    this.props.history.push(`/favoritos/`);
  }

  goHist() {
    this.props.history.push(`/historial/`);
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  logout = (e) => {
    localStorage.clear();
    this.setState({
      session: null,
      idSession: null,
    });
    window.location.href = "http://localhost:3000/";
  };

  render() {
    const show = this.state.menu ? "show" : "";

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-medic">
          <Link to="/" className="navbar-brand">
            <h1>Medic Scraper</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"collapse navbar-collapse " + show}>
            {!this.state.session && (
              <React.Fragment>

                <div className="navbar-nav ml-auto">
                  <Link to="/Login" className="btn btn-login btn-lg">
                    Iniciar sesi&oacute;n
                  </Link>
                </div>

              </React.Fragment>
            )}
            {this.state.session && (
              <React.Fragment>
                <div className="navbar-nav ml-auto">
                  <span className="user" align="center">
                    {this.state.session}
                  </span>
                  <button onClick={this.goHist} className="btn btn-login btn-md">
                    Ver historial
                  </button>
                  <button onClick={this.goFavs} className="btn btn-login btn-md">
                    Ver favoritos
                </button>
                  <button onClick={this.logout} className="btn btn-login btn-lg">
                    Cerrar sesi&oacute;n
                </button>
                </div>
              </React.Fragment>
            )}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default withRouter(Nav);
