import React from "react";
import md5 from "md5";
import "./styles/Login.css";
import PageLoading from "../components/PageLoading";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        pass: "",
      },
      loading: false,
      error: false,
      userExists: false,
      errorPass: false,
      tries: 0,
      session: localStorage.getItem("username"),
    };
  }

  componentDidMount() {
    if (this.state.session) this.goHome();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: false,
    });
    fetch(`/login/${this.state.form.username}`)
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        console.log(results);
        if (results.userExists) {
          const hash = md5(this.state.form.pass);
          console.log(hash);
          this.setState({
            loading: false,
            userExists: true,
            errorPass: hash !== results.result[0].pass,
            idUser: results.result[0].idUser,
          });
          if (!this.state.errorPass) {
            localStorage.setItem("username", this.state.form.username);
            localStorage.setItem("idUser", this.state.idUser);
            this.goHome();
          }
        } else {
          this.setState({
            loading: false,
            userExists: false,
            tries: 1,
            errorPass: false,
          });
        }
      });
  };

  handleOnChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  goHome = () => {
    window.location.href = "http://localhost:3000/";
  };

  render() {
    if (this.state.loading === true) {
      return <PageLoading />;
    }
    if (this.state.userExists && !this.state.errorPass) {
      return (
        <div className="alert alert-success" role="alert">
          <p>Se inicio sesión correctamente</p>
        </div>
      );
    }
    return (
      <React.Fragment>
        {this.state.tries > 0 && !this.state.userExists && (
          <div className="alert alert-danger " role="alert">
            <p className="mb-0">No se encontró el usuario</p>
          </div>
        )}
        {this.state.tries > 0 && this.state.userExists && this.state.errorPass && (
          <div className="alert alert-danger " role="alert">
            <p className="mb-0">Revisa tu contraseña.</p>
          </div>
        )}
        <div className="d-flex align-items-center flex-column forms">
          <div className="form-group">
            <p className="title">Iniciar Sesi&oacute;n</p>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nombre de usuario"
                name="username"
                onChange={this.handleOnChange}
              />
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                name="pass"
                onChange={this.handleOnChange}
              />
              <button
                type="submit"
                className=" form-control form-control-lgbtn btn-primary btn-lg"
              >
                Iniciar
              </button>
              <Link to="/Registration">
                ¿Aún no tienes una cuenta? Reg&iacute;strate
              </Link>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
