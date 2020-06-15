import React, { Component } from "react";
import PageLoading from "../components/PageLoading";
import { Link } from "react-router-dom";
import susana from "../assets/susana-d.png";

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: localStorage.getItem("idUser"),
      username: localStorage.getItem("username"),
      favoritos: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`/getLikes/${this.state.idUser}`)
      .then((response) => {
        return response.json();
      })
      .then((favoritos) => {
        if (favoritos.length > 0) {
          this.setState({ favoritos, loading: false });
        } else {
          this.setState({ favoritos: null, loading: false });
        }
      });
  };

  render() {
    if (!this.state.idUser) {
      return (
        <React.Fragment>
          <div className="container" style={{ textAlign: "center" }}>
            <h1>Ooops, parece que no puedes estar aquí</h1>
            <img src={susana} className="img-susana"></img>
            <h4>
              Para ver tus productos favoritos
              <Link to="/login"> Inicia Sesi&oacute;n.</Link>
            </h4>
            <h4>
              Si no tienes cuenta, puedes
              <Link to="/Registration"> Crear Una.</Link>
            </h4>
          </div>
        </React.Fragment>
      );
    }

    if (this.state.loading === true) {
      return <PageLoading />;
    }

    if (!this.state.favoritos) {
      return (
        <React.Fragment>
          <h1>
            A&uacute;n no tienes productos marcados como favoritos. Puedes{" "}
            <Link to="/"> buscar algo </Link> para agregarlos a favoritos
          </h1>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <h1>Tus Favoritos:</h1>
      </React.Fragment>
    );
  }
}

export default Favoritos;
