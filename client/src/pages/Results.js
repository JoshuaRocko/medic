import React from "react";
import PageLoading from "../components/PageLoading";
import Card from "../components/Card";

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
    fetch(`/search/${this.props.med}`)
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
          <div className="card-deck">
            {this.state.data.map((result) => {
              return <Card data={result}></Card>;
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Results;
