import React from "react";
import "./styles/Nav.css";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      session: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  render() {
    const show = this.state.menu ? "show" : "";

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                  <Link to="/Login" className="btn btn-primary btn-lg">
                    Iniciar sesi&oacute;n
                  </Link>
                </div>
              </div>
            </React.Fragment>
          )}
        </nav>
      </React.Fragment>
    );
  }
}

export default Nav;
