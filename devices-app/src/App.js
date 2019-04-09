import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../src/screens/Home/Home";
import NotFound from "../src/screens/NotFound/NotFound";
import LoginWithContext from "../src/screens/Login/Login";
import Logout from "../src/screens/Logout/Logout";
import CreateDevice from "../src/screens/CreateDevice/CreateDevice";
import EditDevice from "../src/screens/EditDevice/EditDevice";
import DetailsDevice from "../src/screens/DetailsDevice/DetailsDevice";
import MyDevices from "../src/screens/MyDevices/MyDevices";
import Signup from "../src/screens/Signup/Signup";
import AllDevices from "../src/screens/AllDevices/AllDevices";

import NavBarWithConsumer from "../src/components/NavBar/NavBar";
// import AllDevicesCards from "../src/components/AllDevicesCards/AllDevicesCards";
import AuthorizedRouteWithContext from "../src/components/AuthorizedRoute/AuthorizedRoute";

import { UserProvider, defaultUserState } from "./context/user-context";
import { DeviceProvider, defaultDeviceState } from "./context/device-context";

import BorrowedBy from "./screens/BorrowedBy/BorrowedBy";

class App extends Component {
    constructor(props) {
        super(props);

        const userFromStorage = window.localStorage.getItem('user');
        const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};

        this.state = {
            user: {
                ...defaultUserState,
                ...parsedUser
            },
            devices: {
                ...defaultDeviceState,
            }
        }
    }

    updateUser = (user) => {
        console.log("updateUser", user);
        this.setState({ user });
    }

    updateDevices = (devices) => {
        this.setState({ devices });
    }
    
    render() {
        const { user, devices } = this.state;
        const contextForDevices = {
            updateDevices: this.updateDevices,             
            devices
        }

        const contextForLogin = {
            updateUser: this.updateUser, 
            user
        }

        return (
            <Router>
                <DeviceProvider value={contextForDevices}>
                    <UserProvider value={contextForLogin}>
                        <NavBarWithConsumer />
                        <Switch>
                            <Route path="/" component={Home} exact={true} />
                            <Route path="/login" component={LoginWithContext} exact={true} />
                            <Route path="/signup" component={Signup} exact={true} />
                            <Route path="/my-devices" component={MyDevices} exact={true} />
                            <Route path="/all-devices" component={AllDevices} exact={true} />
                            <AuthorizedRouteWithContext path="/create-device" component={CreateDevice} exact={true} allowedRoles={'admin'}/>
                            <AuthorizedRouteWithContext path="/edit/:deviceId" component={EditDevice} exact={true} allowedRoles={'admin'}/>
                            <Route path="/logout" component={Logout} exact={true}/>
                            <Route path="/review/:deviceId" component={DetailsDevice} exact={true} />
                            <Route path="/borrowedBy/:deviceId" component={BorrowedBy} />
                            <Route component={NotFound} />
                        </Switch>
                    </UserProvider>
                </DeviceProvider>
            </Router>
        );
    }
}

export default App;
