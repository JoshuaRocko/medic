import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Results from "../pages/Results";
import Home from "../pages/Home";

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/results/:med" component={Results} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
