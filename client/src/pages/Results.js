import React from "react";
import PageLoading from "../components/PageLoading";
import "./styles/Results.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      med: props.match.params.med,
      loading: true,
      error: null,
      data: [],
      idMed: 0,
      filter: 1,
      idSession: localStorage.getItem("idUser"),
    };

    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    /*if(this.state.idSession != null){ // si el usuario esta registrado
      fetch("/addhistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.idSession,
          med: this.props.match.params.med,
        }),
      })
        .then((response) => {
          return response.json();
        })
    }*/
  }

  fetchData = () => {
    fetch(`/existeMed/${this.state.med}`)
      .then((response) => {
        return response.json();
      })
      .then((resultado) => {
        console.log(resultado);
        if (resultado.length > 0) {
          this.setState({ idMed: resultado[0].idMed });
          this.getData();
        } else {
          this.setState({ idMed: 0 });
          this.scrapeData();
        }
      });
  };

  getData = () => {
    fetch(`/getProducts/${this.state.med}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ data, loading: false });
      });
  };

  scrapeData = () => {
    fetch(`/scrapeProducts/${this.state.med}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ data, loading: false });
      });
  };

  changeFilter(event) {
    this.setState({ filter: event.target.value });
    console.log(this.state.filter);
    let aux = this.state.data;
    const dataOrdered = aux.sort((a, b) => {
      let precioA = a.precio.split("$");
      let precioB = b.precio.split("$");
      console.log("::::::::::", aux);
      if (this.state.filter === 1) return precioB[1] - precioA[1];
      else return precioA[1] - precioB[1];
      //return precioA[1] > precioB[1] ? 1 : precioA[1] < precioB[1] ? -1 : 0;
    });
    this.setState({ data: dataOrdered });
    /* } else {
      const dataOrdered = this.state.data.sort((a, b) => {
        let precioA = a.precio.split("$");
        let precioB = b.precio.split("$");
        return precioA[1] - precioB[1]
        //return precioA[1] < precioB[1] ? 1 : precioA[1] > precioB[1] ? -1 : 0;
      });
      this.setState({ data: dataOrdered });
    }
    console.log(this.state.data);*/
  }

  /*<form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>*/
  render() {
    function myFunction(precio) {
      //var value = 
      console.log("precio es",precio);
      if(localStorage.getItem("idUser") == undefined){
        console.log("no user loged in");
      }else{
        
        console.log("user",localStorage.getItem("idUser"),"liked product",precio);

      }
      document.getElementById(precio).style.color = "blue";
      
      }
    if (this.state.loading === true) {
      return <PageLoading />;
    }

    return (
      <React.Fragment>
        <div className="alert alert-primary" role="alert">
          <p className="mb-0">
            <Link to={`/information/${this.props.match.params.med}`}>
              Ver información del medicamento
              
            </Link>
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
              id="filter"
              onChange={this.changeFilter}
              value={this.state.filter}
            >
              <option value="1">De menor a mayor</option>
              <option value="2">De mayor a menor</option>
            </select>
          </div>
        </nav>
        <div className="container">
          <div className="card-columns">
            {this.state.data.map((result) => {
              if (result.link === undefined) {
                return (
                  <Redirect
                    to={
                      "/medicamento-no-encontrado/" +
                      this.props.match.params.med
                    }
                  />
                );
                {
                  /* redireccionar a una página de error */
                }
              }
              return (
                
                <div key={result.link} className="card mb-3">
                {console.log(result.idm)}
                  <img
                    href={result.link}
                    className="card-img-top imagen"
                    src={result.img}
                    alt="Imagen no disponible por el momento"
                  />
                  <div className="card-body">
                    <a className="card-title text-primary" href={result.link}>
                      {result.desc}
                    </a>
                    <p className="card-text">Precio: ${result.precio}</p>
                    <p className="card-text">Tienda: {result.tienda}</p>
                  </div>

                  <span onClick={() => myFunction(result.idm)}>
                    <button class="button">Agregar a\nfavoritos&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faThumbsUp} size="1x" id={result.idm} data="0" /></button>
                    </span>
                  <div className="card-footer text-center">
                    <a
                      href={result.link}
                      className="btn btn-dark"
                      target="blank"
                    >
                      Ir al sitio
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Results;
