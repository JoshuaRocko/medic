import React from "react";
import PageLoading from "../components/PageLoading";
import "./styles/Information.css";

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
    return (
      <React.Fragment>
        <h1 className="title">{this.props.match.params.med.toUpperCase()}</h1>
        <hr />
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
          {console.log(this.state.data.ad)}
        </div>
        <div className></div>
      </React.Fragment>
    );
  }
}

export default Information;
