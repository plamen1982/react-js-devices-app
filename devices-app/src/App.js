import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "../src/components/NavBar/NavBar";
import Home from "../src/components/Home/Home";
import Login from "../src/components/Login/Login";
import Signup from "../src/components/Signup/Signup";
import MyDevices from "../src/components/MyDevices/MyDevices";
import AllDevices from "../src/components/AllDevices/AllDevices";
import CreateDevice from "../src/components/CreateDevice/CreateDevice";
import DetailsDevice from "../src/components/DetailsDevice/DetailsDevice";
import NotFound from "../src/components/NotFound/NotFound";

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                  <NavBar />
                  <Switch>
                      <Route path="/" component={Home} exact={true} />
                      <Route path="/login" component={Login} exact={true} />
                      <Route path="/signup" component={Signup} exact={true} />
                      <Route path="/my-devices" component={MyDevices} exact={true} />
                      <Route path="/all-devices" component={AllDevices} exact={true} />
                      <Route path="/create-device" component={CreateDevice} exact={true} />
                      <Route path="/details/deviceId" component={DetailsDevice} exact={true} />
                      <Route component={NotFound} />
                  </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default App;
