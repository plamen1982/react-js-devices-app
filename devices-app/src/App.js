import React, { Component, Fragment } from "react";
import NavBar from "../src/components/NavBar/NavBar";
import Home from "../src/components/Home/Home";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                  <NavBar />
                  <Switch>
                      <Route path="/" component={Home} exact={true} />
                      <Route path="/all-devices" exact={true} />
                      <Route path="/my-devices" exact={true} />
                      <Route path="/login" exact={true} />
                      <Route path="/signup" exact={true} />
                  </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default App;
