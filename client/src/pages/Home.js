import React from "react";
import "./styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      med: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      med: event.target.value,
    });
  };

  render() {
    return (
      <div className="fondo">
        <div className="d-flex align-items-center flex-column">
          <p className="title">Medic Scraper</p>
          <h3>Buscar medicamento</h3>
          <div className="d-flex align-items-center">
            <input
              className="in"
              type="search"
              placeholder="Teclea el nombre del medicamento"
              onChange={this.handleInput}
              value={this.state.med}
            />
            <Link to={`/results/${this.state.med}`}>
              <FontAwesomeIcon icon={faSearch} size="3x" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
