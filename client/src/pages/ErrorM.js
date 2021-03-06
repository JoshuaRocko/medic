import React from "react";
import PageLoading from "../components/PageLoading";
import "./styles/Information.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import susana from "../assets/susana-d.png";

class ErrorM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: undefined,
      med: "",
    };
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.history.push(`/results/${this.state.med}`);
    }
  }

  handleInput = (event) => {
    this.setState({
      med: event.target.value,
    });
  };

  componentDidMount() {
    fetch(`/info/${this.props.match.params.med}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          data,
          loading: false,
          error: null,
        });
      });

  }

  render() {
    if (this.state.loading === true) {
      return <PageLoading />;
    }
    // if (this.state.data.info === undefined){
    //   return <Redirect to="/" />; {/* redireccionar a una página de error */}
    // }
    return (
      <React.Fragment>
        <div className="container">
        <h1 className="title">No se encontró ningún producto con el nombre de {this.props.match.params.med.toUpperCase()}</h1>
        <img src={susana} className="img-susana"></img>
        <hr />
        <div className="text-block">
        <h6>Por favor, intente escribirlo sin acentos o puede buscar otro medicamento</h6>{/* alinear al centro */}
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
      </React.Fragment>
    );
  }
}

export default ErrorM;
