import React from "react";
import "./styles/Nav.css";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      session: localStorage.getItem("username"),
      idSession: localStorage.getItem("idUser"),
    };
    this.toggleMenu = this.toggleMenu.bind(this);
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
          {!this.state.session && (
            <React.Fragment>
              <button
                className="navbar-toggler"
                type="button"
                onClick={this.toggleMenu}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={"collapse navbar-collapse " + show}>
                <div className="navbar-nav ml-auto">
                  <Link to="/Login" className="btn btn-login btn-lg">
                    Iniciar sesi&oacute;n
                  </Link>
                </div>
              </div>
            </React.Fragment>
          )}
          {this.state.session && (
            <React.Fragment>
              <div className="navbar-nav ml-auto">
                <div className="user" align="center">
                  {this.state.session}
                </div>
                <button className="btn btn-login btn-lg">
                  <Link to="/historial" style={{ color: "white" }}>
                    Ver historial
                  </Link>
                </button>
                <button className="btn btn-login btn-lg">Ver favoritos</button>
                <button onClick={this.logout} className="btn btn-login btn-lg">
                  Cerrar sesi&oacute;n
                </button>
              </div>
            </React.Fragment>
          )}
        </nav>
      </React.Fragment>
    );
  }
}

export default Nav;
