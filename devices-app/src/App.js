import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../src/views/Home/Home";
import NotFound from "../src/views/NotFound/NotFound";
import NavBar from "../src/components/NavBar/NavBar";
import Login from "../src/views/Login/Login";
import Signup from "../src/components/Signup/Signup";
import MyDevices from "../src/components/MyDevices/MyDevices";
import AllDevicesCards from "../src/components/AllDevicesCards/AllDevicesCards";
import CreateDevice from "../src/components/CreateDevice/CreateDevice";
import DetailsDevice from "../src/components/DetailsDevice/DetailsDevice";
import { UserProvider, defaultUserState } from "./context/user-context";

class App extends Component {
    constructor(props) {
        super(props);

        const userFromStorage = window.localStorage.getItem('user')
        const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};

        this.state = {
            user: {
                ...defaultUserState,
                ...parsedUser,
                updateUser: this.updateUser,
            }
        }
    }

    updateUser = (user) => {
        this.setState({ user })
    }

    render() {
        const { user } = this.state;

        return (
            <Router>
                <UserProvider value={user} >
                    <NavBar />
                    <Switch>
                        <Route path="/" component={Home} exact={true} />
                        <Route path="/login" component={Login} exact={true} />
                        <Route path="/signup" component={Signup} exact={true} />
                        <Route path="/my-devices" component={MyDevices} exact={true} />
                        <Route path="/all-devices" component={AllDevicesCards} exact={true} />
                        <Route path="/create-device" component={CreateDevice} exact={true} />
                        <Route path="/details/:deviceId" component={DetailsDevice} exact={true} />
                        <Route component={NotFound} />
                    </Switch>
                </UserProvider>
            </Router>
        );
    }
}

export default App;
