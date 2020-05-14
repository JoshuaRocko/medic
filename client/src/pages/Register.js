import React from "react";
import PageLoading from "../components/PageLoading";
import "./styles/Results.css";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        email: "",
        pass1: "",
        pass2: "",
      },
      alertpassDif: false,
      alertpass: false,
      alertUsernameErr: false,
      initErr: true,
      loading: false,
      error: null,
      userId: null,
    };
  }

  handleOnChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      alertpassDif: this.state.form.pass1 !== this.state.form.pass2,
      alertpass: !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
        this.state.form.pass1
      ),
      alertUsernameErr: !/^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/.test(
        this.state.form.username
      ),
      initErr: false,
    });
    if (
      !(
        this.state.alertUsernameErr ||
        this.state.alertpass ||
        this.state.alertpassDif ||
        this.state.initErr
      )
    ) {
      this.createUser();
    }
  };

  createUser = () => {
    this.setState({
      loading: true,
      error: null,
    });
    fetch(
      `/create/${this.state.form.email}/${this.state.form.username}/${this.state.form.pass1}`,
      { method: "POST" }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.setState({
          loading: false,
          error: null,
          userId: result.insertId,
        });
      });
  };

  render() {
    if (this.state.loading === true) {
      return <PageLoading />;
    }
    if (this.state.userId) {
      return (
        <div className="alert alert-success" role="alert">
          <p>
            Usuario creado. <Link to="Login">Iniciar sesion.</Link>
          </p>
        </div>
      );
    }
    return (
      <React.Fragment>
        {(this.state.alertpass ||
          this.state.alertpassDif ||
          this.state.alertUsernameErr) && (
          <div className="alert alert-danger" role="alert">
            {this.state.alertpass && (
              <p className="mb-0">
                La contraseña debe tener almenos 8 caracteres y un n&uacute;mero
              </p>
            )}
            {this.state.alertpassDif && (
              <p className="mb-0">Las contraseñas deben coincidir.</p>
            )}
            {this.state.alertUsernameErr && (
              <p className="mb-0">El usuario debe tener almenos 3 caracteres</p>
            )}
          </div>
        )}
        <div className="d-flex align-items-center flex-column forms">
          <div className="form-group">
            <p className="title">Registrate</p>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                className="form-control form-control-lg"
                onChange={this.handleOnChange}
                value={this.state.form.username}
                placeholder="Nombre de usuario"
              />
              <input
                type="email"
                name="email"
                className="form-control form-control-lg"
                onChange={this.handleOnChange}
                value={this.state.form.email}
                placeholder="Correo"
              />
              <input
                type="password"
                name="pass1"
                className="form-control form-control-lg"
                onChange={this.handleOnChange}
                value={this.state.form.pass1}
                placeholder="Contraseña"
              />
              <input
                type="password"
                name="pass2"
                className="form-control form-control-lg"
                onChange={this.handleOnChange}
                value={this.state.form.pass2}
                placeholder="Confirma contraseña"
              />

              <button
                type="submit"
                className=" form-control form-control-lgbtn btn-primary btn-lg"
              >
                Crear cuenta
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
