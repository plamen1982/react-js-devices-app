import React, { Component, Fragment } from "react";
import NavBar from "../src/components/NavBar/NavBar";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <Fragment>
                <NavBar />
                <Switch>
                  <Route path="/"/>
                  <Route path="/all-devices"/>
                  <Route path="/my-devices"/>
                  <Route path="/login" />
                  <Route path="/signup" />
                </Switch>
            </Fragment>
        );
    }
}

export default App;
