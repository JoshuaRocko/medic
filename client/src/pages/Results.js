import React from "react";
import PageLoading from "../components/PageLoading";
import "./styles/Results.css";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: undefined,
    };
  }

  componentDidMount() {
    fetch(`/search/${this.props.match.params.med}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => this.setState({ data, loading: false }));
  }

  render() {
    if (this.state.loading === true) {
      return <PageLoading />;
    }
    return (
      <React.Fragment>
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
