import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Results from "../pages/Results";
import Home from "../pages/Home";
import Registration from "./../pages/Registration" 

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/results/:med" component={Results} />
          <Route exact path="/Registration/" component={Registration} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
