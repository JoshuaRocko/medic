import React from "react";
import PageLoading from "../components/PageLoading";
import "./styles/Information.css";
import { Redirect } from "react-router-dom";


class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: undefined,
    };
  }

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
    if (this.state.data.info === undefined){
      return <Redirect to="/" />; {/* redireccionar a una página de error */}
    }
    return (
      <React.Fragment>
        <h1 className="title">{this.props.match.params.med.toUpperCase()}</h1>
        <hr />
        <h6>Consulta a tu médico siempre / NO te automediques / Esta es una Guía informativa</h6>{/* alinear al centro */}
        <p className="info">{this.state.data.info}</p>
        <div className="info">
          <h3>Usos más comúnes</h3>
          <ul>
            {this.state.data.usos
              .filter((uso) => {
                return uso !== "\n";
              })
              .map((uso) => {
                return <li key={uso}>{uso.trim()}</li>;
              })}
          </ul>
        </div>
        <div>
          <h3>Contradicciones y advertencias</h3>
          <ul>
            {this.state.data.contradicciones
              .filter((uso) => {
                return uso !== "\n";
              })
              .map((uso) => {
                return <li key={uso}>{uso.trim()}</li>;
              })}
          </ul>
          {console.log(this.state.data.contradicciones)}
        </div>
        <div>
          <h3>Efectos Secundarios</h3>
          <h5>Este medicamento podría provocar algunos efectos secundarios tales como:</h5>
          <ul>
            {this.state.data.ad
              .filter((uso) => {
                return uso !== "\n";
              })
              .map((uso) => {
                return <li key={uso}>{uso.trim()}</li>;
              })}
          </ul>
          {console.log(this.state.data.ad)}
        </div>
        <div>
        <h6>
          Para más información visita:
        </h6>
        <p><a href={'https://quefarmacia.com/medicamentos/' + this.props.match.params.med}>https://quefarmacia.com/medicamentos/{this.props.match.params.med}</a></p>
        </div>
        <div className></div>
      </React.Fragment>
    );
  }
}

export default Information;
