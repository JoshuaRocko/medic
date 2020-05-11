import React from "react";
import "./styles/Home.css";
var mysqlConf = require('./configDB.js').mysql_pool;//CONEXION DB

const initialState = {
  email: "",
  username: "",
  password: "",   
  password_confirm: "",
  emailErr: "",
  usernameErr: "",
  passwordErr: "",   
  password_confirmErr: "",
};

class Registration extends React.Component {
    constructor(props) {
      super(props);
      this.state = initialState;
    }
      handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if(isValid){
          console.log(this.state);
          //var query = "INSERT INTO `user` (`email`, `username`, `password`) VALUES ('"+ this.state.email +"', '"+ this.state.username +"', MD5('"+this.state.password+"'))";  
          //mysqlConf.getConnection(function (err, connection) {
          //  connection.query(query ,function (err, rows) {
          //      connection.release();   //---> don't forget the connection release.
          //  });
          //});
          this.setState(initialState);
        }
      }

      validate = ()=>{
        let emailErr= "";
        let usernameErr= "";
        let passwordErr= "";   
        let password_confirmErr= "";

        if(!this.state.email || !this.state.email.includes('@') ||!this.state.email.includes('.com')){
          emailErr = 'correo invalido';
        }
        //console.log(/^(?=.*?[A-Z])(?=.*?[a-z]).{3,}$/.test(this.state.username));
        if(!(/^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/.test(this.state.username))){
          usernameErr = 'nombre de usuario invalido, \n debe incluir almenos un caracteres alfabéticos.';
          if(this.state.username.length < 3){
            
            usernameErr = 'nombre de usuario invalido, \n debe ser almenos 3 caracters.';
          }
        }
        
        if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.state.password))){
          passwordErr = 'contraseña inválida, debe ser almenos 8 caracteres y contener almenos una letra y un número';
        }
        if(this.state.password_confirm.localeCompare(this.state.password)){
          password_confirmErr = 'las contraseñas deben coincidir';
        }

        if(emailErr || usernameErr || passwordErr || password_confirmErr){
          this.setState({emailErr, usernameErr, passwordErr, password_confirmErr})
          return false;
        }
        return true;
      }

      

     handleInputEmail = (event) => {
       this.setState({
        email: event.target.value,
       });
      console.log(event.target.value);
     };
     handleInputUsername = (event) => {
      this.setState({
       username: event.target.value,
      });
     console.log(event.target.value);
    };
    handleInputPassword = (event) => {
      this.setState({
       password: event.target.value,
      });
     console.log(event.target.value);
    };
    handleInputPasswordCon = (event) => {
      this.setState({
        password_confirm: event.target.value,
      });
      console.log(event.target.value);
    };
  
    render() {
      return (
        
      

        <div className="fondo">
        
          <div className="d-flex align-items-center flex-column">
            <p className="title">Registro</p>
            <h3>Ingrese sus datos</h3>
            <form id="registro" onSubmit={this.handleSubmit}>
            <div className="d-flex align-items-center">
              <input
                id="email"
                className="in"
                type="text"
                placeholder="Correo"
                onChange={this.handleInputEmail}
                value={this.state.email}
              />
              <h4>{this.state.emailErr}</h4>
            </div>
            <div className="d-flex align-items-center">
              <input
                id="username"
                className="in"
                type="text"
                placeholder="Nombre de usuario"
                onChange={this.handleInputUsername}
                value={this.state.username}
              />
              <h4>{this.state.usernameErr}</h4>
              </div>
            <div className="d-flex align-items-center">
             <input
                name="password"
                className="in"
                type="password"
                placeholder="Contra&ntilde;a"
                onChange={this.handleInputPassword}
                value={this.state.password}
              />
              <h4>{this.state.passwordErr}</h4>
              </div>
            <div className="d-flex align-items-center">
              <input
                id="passwordC"
                className="in"
                type="password"
                placeholder="Confirme su contrase&ntilde;a"
                onChange={this.handleInputPasswordCon}
                value={this.state.password_confirm}
              />
              <h4>{this.state.password_confirmErr}</h4>
              </div>
            <div className="d-flex align-items-center">

              {/* <Link to={`/results/${this.state.med}`}>
                <FontAwesomeIcon icon={faSearch} size="3x" />
              </Link> */}
              <input type="submit" value="Submit"></input>
            </div>
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Registration;