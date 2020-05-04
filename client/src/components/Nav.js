import React from "react";
import "./styles/Nav.css";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="nav">
          <Link to="/">
            <h1>Medic Scraper</h1>
          </Link>
          <button type="button" className="btn btn-primary btn-lg">
            Iniciar sesi&oacute;n
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Nav;
