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
        <div>
          <div className="container">
            {this.state.data.map((result) => {
              return (
                <div key={result.link} className="row">
                  <div className="col">
                    <img
                      className="rounded float-left imagen"
                      src={result.img}
                      alt="imagen"
                    />
                    <div className="col">
                      <h4>{result.desc}</h4>
                      <p>Precio: {result.precio}</p>
                      <a
                        href={result.link}
                        className="btn-primary"
                        target="blank"
                      >
                        Ir al sitio
                      </a>
                    </div>
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
