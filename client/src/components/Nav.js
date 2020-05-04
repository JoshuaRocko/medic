import React from "react";
import "./styles/Nav.css";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu })
  }

  render() {
    const show = (this.state.menu) ? "show" : "";

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            <h1>Medic Scraper</h1>
          </Link>
          <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"collapse navbar-collapse " + show}>
            <div className="navbar-nav ml-auto">
              <button type="button" className="btn btn-primary btn-lg">
                Iniciar sesi&oacute;n
              </button>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Nav;
