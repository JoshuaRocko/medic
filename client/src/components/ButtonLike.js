import React from "react";
import "../pages/styles/Results.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
class ButtonLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idSession: localStorage.getItem("idUser"),
      buttonClass: "button",
      message: "Favorito",
    };
    this.buttonRef = React.createRef();
    this.addLike = this.addLike.bind(this);
  }

  componentDidMount() {
    this.checkLike();
  }

  checkLike = () => {
    if (this.state.idSession === null) {
      console.log("nada");
    } else {
      fetch(`/getLike/${this.state.idSession}/${this.props.idm}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.length !== 0) this.setState({ buttonClass: "buttonLiked" });
          else this.setState({ buttonClass: "button" });
        });
    }
  };

  addLike = (idm) => (e) => {
    console.log(this.state.idSession);
    if (this.state.idSession === null) {
      console.log("no user login in");
    } else {
      fetch(`/getLike/${this.state.idSession}/${idm}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.length !== 0) {
            /** Liked */
            fetch("/unlike", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                idUser: this.state.idSession,
                idProd: idm,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((result) => {
                console.log(result);
                this.setState({ buttonClass: "button" });
              });
          } else {
            /** not liked */
            fetch("/like", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                idUser: this.state.idSession,
                idProd: idm,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((result) => {
                console.log(result);
                this.setState({ buttonClass: "buttonLiked" });
              });
          }
        });
    }
  };

  onMouseOver = (e) => {
    this.setState({ message: "Eliminar de favoritos" });
  };

  onMouseLeave = (e) => {
    this.setState({ message: "Favorito" });
  };

  render() {
    if (this.state.buttonClass === "button") {
      return (
        <button
          onClick={this.addLike(this.props.idm)}
          className={this.state.buttonClass}
          ref={this.buttonRef}
        >
          Agregar a favoritos&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faThumbsUp} size="1x" />
        </button>
      );
    }

    if (this.state.buttonClass === "buttonLiked") {
      return (
        <button
          onClick={this.addLike(this.props.idm)}
          className={this.state.buttonClass}
          ref={this.buttonRef}
          onMouseOver={this.onMouseOver}
          onMouseLeave={this.onMouseLeave}
        >
          {this.state.message}&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faThumbsUp} size="1x" />
        </button>
      );
    }
  }
}

export default ButtonLike;
