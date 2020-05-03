import React from "react";
import "./styles/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-end boton">
          <button type="button" class="btn btn-primary btn-lg">
            Iniciar sesi&oacute;n
          </button>
        </div>
        <div className="d-flex align-items-center flex-column">
          <p className="title">Medic Scraper</p>
          <h3>Buscar medicamento</h3>
          <div className="d-flex align-items-center">
            <input className="in" type="text" />
            <FontAwesomeIcon icon={faSearch} size="3x" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
