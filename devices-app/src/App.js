import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../src/views/Home/Home";
import NotFound from "../src/views/NotFound/NotFound";
import Login from "../src/views/Login/Login";
import Logout from "../src/views/Logout/Logout";
import CreateDevice from "../src/views/CreateDevice/CreateDevice";
import DetailsDevice from "../src/views/DetailsDevice/DetailsDevice";
import MyDevices from "../src/views/MyDevices/MyDevices";
import Signup from "../src/views/Signup/Signup";

import NavBar from "../src/components/NavBar/NavBar";
import AllDevicesCards from "../src/components/AllDevicesCards/AllDevicesCards";
import AuthorizedRoute from "../src/components/AuthorizedRoute/AuthorizedRoute";

import { UserProvider, defaultUserState } from "./context/user-context";

class App extends Component {
    constructor(props) {
        super(props);

        const userFromStorage = window.localStorage.getItem('user');
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
        this.setState({ user });
    }

    render() {
        const { user } = this.state;

        return (
            <Router>
                <UserProvider value={user}>
                    <NavBar />
                    <Switch>
                        <Route path="/" component={Home} exact={true} />
                        <Route path="/login" component={Login} exact={true} />
                        <Route path="/signup" component={Signup} exact={true} />
                        <Route path="/my-devices" component={MyDevices} exact={true} />
                        <Route path="/all-devices" component={AllDevicesCards} exact={true} />
                        <AuthorizedRoute path="/create-device" component={CreateDevice} exact={true} allowedRoles={['admin']}/>
                        <AuthorizedRoute path="/logout" component={Logout} exact={true}/>
                        <Route path="/details/:deviceId" component={DetailsDevice} exact={true} />
                        <Route component={NotFound} />
                    </Switch>
                </UserProvider>
            </Router>
        );
    }
}

export default App;
