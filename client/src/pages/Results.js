import React from "react";
import PageLoading from "../components/PageLoading";
import "./styles/Results.css";
import { Redirect } from "react-router-dom";
import ButtonLike from "../components/ButtonLike";
import VentanaModal from "../components/VentanaModal";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      med: props.match.params.med.toLowerCase(),
      loading: true,
      error: null,
      data: [],
      idMed: 0,
      filter: "true",
      idUser: localStorage.getItem("idUser"),
      info: undefined,
      mostrarModal: false,
    };
    this.productRef = [];
    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch(`/existeMed/${this.state.med}`);
    const resultado = await response.json();
    if (resultado.length > 0) {
      console.log("SI EXISTE UWU");
      this.setState({ idMed: resultado[0].idMed });
      await this.getData();
    } else {
      console.log("NO EXISTE UNU");
      this.setState({ idMed: 0 });
      await this.scrapeData();
    }
    this.addHistory();
  };

  getData = async () => {
    const response = await fetch(`/getProducts/${this.state.med}`);
    const data = await response.json();
    if (data) {
      this.setState({ data, loading: false });
    }
  };

  scrapeData = async () => {
    const responseScrapeData = await fetch(`/scrape/${this.state.med}`);
    const data = await responseScrapeData.json();
    if (data) {
      const responseExisteMed = await fetch(`/existeMed/${this.state.med}`);
      const resultadoExisteMed = await responseExisteMed.json();
      if (resultadoExisteMed.length > 0) {
        this.setState({ idMed: resultadoExisteMed[0].idMed });
        console.log("Se asigno ID", this.state.idMed);
        await this.getData();
      } else {
        this.setState({ idMed: 0 });
      }
    }
  };

  addHistory = async () => {
    console.log("AddHistory");
    if (this.state.idUser) {
      const responseCheckHistory = await fetch(
        `/checkHistory/${this.state.idMed}/${this.state.idUser}`
      );
      const resultCheckHistory = await responseCheckHistory.json();
      if (resultCheckHistory.length > 0) {
        /** Update */
        console.log("UpdateHistory");
        await fetch("/updateHistory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUser: this.state.idUser,
            idMed: this.state.idMed,
          }),
        });
      } else {
        /** Add */
        console.log("AddHistory");
        await fetch("/addhistory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUser: this.state.idUser,
            idMed: this.state.idMed,
            med: this.props.match.params.med,
          }),
        });
      }
    }
  };

  changeFilter(event) {
    console.log(this.state.filter);
    this.setState({ filter: event.target.value });
    console.log(this.state.filter);
    let aux = this.state.data;
    /*
    for (let x = 0; x < aux.length; x++) {
      for (let i = 0; i < aux.length-x-1; i++) {
          if(aux[i] < aux[i+1]){
              let tmp = aux[i+1];
              aux[i+1] = aux[i];
              aux[i] = tmp;
          }
      }
  }*/
    const dataOrdered = aux.sort((a, b) => {
      //console.log(a, b);
      let precioA = a.precio;
      let precioB = b.precio;
      //console.log("::::::::::", aux);
      if (this.state.filter == "true") return precioB - precioA;
      else return precioA - precioB;
      //return precioA[1] > precioB[1] ? 1 : precioA[1] < precioB[1] ? -1 : 0;
    });
    this.setState({ data: dataOrdered });
  }

  render() {
    if (this.state.loading === true) {
      return <PageLoading />;
    }
    let cerrarModal = () => this.setState({ mostrarModal: false });
    let regreso = [];
    let cardG = [];
    console.log(this.state.data);
    this.state.data.map((result, i) => {
      if (result.link === undefined) {
        regreso.push(
          <Redirect
            to={"/medicamento-no-encontrado/" + this.props.match.params.med}
          />
        );
        {
          /* redireccionar a una página de error */
        }
      }

      if (i % 4 === 0) {
        regreso.push(
          <div className="card-deck" key={i}>
            {cardG}
          </div>
        );
        cardG = [];
      } else if (this.state.data.length - 1 == i && cardG.length > 0) {
        regreso.push(
          <div className="card-deck" key={i}>
            {cardG}
          </div>
        );
        cardG = [];
      }

      cardG.push(
        <div key={i} className="card mb-3">
          <img
            href={result.link}
            className="card-img-top imagen"
            src={result.img}
            alt="Imagen no disponible por el momento"
          />
          <div className="card-body">
            <a
              className="card-title text-primary"
              href={result.link}
              target="blank"
            >
              {result.desc}
            </a>
            <p className="card-text">Precio: ${result.precio}</p>
            <p className="card-text">Tienda: {result.tienda}</p>
          </div>
          <div className="card-footer text-center">
            <a href={result.link} className="btn btn-dark" target="blank">
              Ir al sitio
            </a>
            <ButtonLike
              idm={result.idm}
              ref={(productRef) => (this.productRef[result.idm] = productRef)}
            ></ButtonLike>
          </div>
        </div>
      );
    });
    /*<Link t o={`/information/${this.props.match.params.med}`}>
              Ver información del medicamento
            </Link>*/
    return (
      <React.Fragment>
        <VentanaModal
          show={this.state.mostrarModal}
          onHide={cerrarModal}
          cabecera={this.props.match.params.med}
        />
        <div className="alert alert-primary" role="alert">
          <p className="mb-0">
            <button
              className="btn btn-link"
              onClick={() => {
                this.setState({ mostrarModal: true });
              }}
            >
              Ver información del medicamento
            </button>
          </p>
        </div>
        <nav className="navbar sticky-top navbar-light bg-light">
          <p className="navbar-brand"></p>
          <h2 className="card-title text-primary">
            Resultados de búsqueda de: {this.props.match.params.med}
          </h2>
          <div className="form-group row">
            {" "}
            &nbsp;&nbsp;&nbsp; Ordenar productos
            <select
              className="form-control"
              onChange={this.changeFilter}
              value={this.state.filter}
            >
              <option value="true">De menor a mayor</option>
              <option value="false">De mayor a menor</option>
            </select>
          </div>
        </nav>
        <div className="container">{regreso}</div>
      </React.Fragment>
    );
  }
}

export default Results;
