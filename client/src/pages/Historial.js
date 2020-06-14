import React from "react";
import { Link } from "react-router-dom";
import PageLoading from "../components/PageLoading";
import susana from "../assets/susana-d.png";

class Historial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: localStorage.getItem("idUser"),
      username: localStorage.getItem("username"),
      loading: true,
      data: null,
    };
  }

  componentDidMount() {
    this.getHistory();
  }

  getHistory = () => {
    fetch(`/getHistory/${this.state.idUser}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          this.setState({ data, loading: false });
        } else {
          this.setState({ data: null, loading: false });
        }
        console.log(this.state.data);
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
              Para ver tu historial de búsqueda
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

    if (!this.state.data) {
      return (
        <React.Fragment>
          <h1>A&uacute;</h1>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="container">
          <h1>Tu historial de b&uacute;squeda:</h1>
        </div>
        <div className="card">
          <ul className="list-group list-group-flush">
            {this.state.data.map((history) => {
              const fecha = history.lastSearch.substring(0, 10);
              const hora = history.lastSearch.substring(11, 16);
              const url = `/results/${history.nombreMed.toLowerCase()}`;
              return (
                <React.Fragment>
                  <li key={history.idMed} className="list-group-item">
                    <Link to={url}>{history.nombreMed.toUpperCase()}</Link>
                    <p className="card-text">
                      <small className="text-muted">
                        &Uacute;ltima b&uacute;squeda: {fecha} a las {hora}
                      </small>
                    </p>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Historial;
