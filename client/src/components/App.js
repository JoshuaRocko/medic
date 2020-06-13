import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Results from "../pages/Results";
import Home from "../pages/Home";
// import Registration from "../pages/Registration";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Information from "../pages/Information";
import ErrorM from "../pages/ErrorM";

function App(props) {
  return (
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/results/:med" component={Results} />
          <Route exact path="/Registration/" component={Register} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/information/:med" component={Information}></Route>
          <Route exact path="/medicamento-no-encontrado/:med" component={ErrorM}></Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
