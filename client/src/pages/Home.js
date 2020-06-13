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

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.history.push(`/results/${this.state.med}`);
    }
  }
  
  render() {
    return (
      <div className="fondo">
        <div className="d-flex align-items-center flex-column">
          <p className="titlehome">Medic Scraper</p>
          <p className="text-shadow">Buscar medicamento</p>
          <div className="d-flex align-items-center">
            <input
              className="in"
              type="search"
              placeholder="Teclea el nombre del medicamento"
              onChange={this.handleInput}
              value={this.state.med}
              onKeyPress={this.handleKeyPress}
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
