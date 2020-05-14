import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Results from "../pages/Results";
import Home from "../pages/Home";
// import Registration from "../pages/Registration";
import Login from "../pages/Login";
import Register from "../pages/Register";

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/results/:med" component={Results} />
          <Route exact path="/Registration/" component={Register} />
          <Route exact path="/Login" component={Login} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
