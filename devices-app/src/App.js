import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "../src/components/NavBar/NavBar";
import Home from "../src/components/Home/Home";
import Login from "../src/components/Login/Login";
import Signup from "../src/components/Signup/Signup";
import MyDevices from "../src/components/MyDevices/MyDevices";

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                  <NavBar />
                  <Switch>
                      <Route path="/" component={Home} exact={true} />
                      <Route path="/all-devices" exact={true} />
                      <Route path="/my-devices" component={MyDevices} exact={true} />
                      <Route path="/login" component={Login} exact={true} />
                      <Route path="/signup" component={Signup} exact={true} />
                  </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default App;
