import React from "react";
import PageLoading from "../components/PageLoading";
import "./styles/Results.css";
import { Link } from "react-router-dom";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: undefined,
      filter: 1,
    };

    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    fetch(`/search/${this.props.match.params.med}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => this.setState({ data, loading: false }));
  }

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
          <div className="form-group row">
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
              return (
                <div key={result.link} className="card mb-3">
                  <img
                    className="card-img-top imagen"
                    src={result.img}
                    alt="imagen"
                  />
                  <div className="card-body">
                    <h4 className="card-title text-primary">{result.desc}</h4>
                    <p className="card-text">Precio: {result.precio}</p>
                  </div>
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
