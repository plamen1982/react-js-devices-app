import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../src/views/Home/Home";
import NotFound from "../src/views/NotFound/NotFound";
import Login from "../src/views/Login/Login";
import Logout from "../src/views/Logout/Logout";
import CreateDevice from "../src/views/CreateDevice/CreateDevice";
import EditDevice from "../src/views/EditDevice/EditDevice";
import DetailsDevice from "../src/views/DetailsDevice/DetailsDevice";
import MyDevices from "../src/views/MyDevices/MyDevices";
import Signup from "../src/views/Signup/Signup";
import AllDevices from "../src/views/AllDevices/AllDevices";

import NavBar from "../src/components/NavBar/NavBar";
import AllDevicesCards from "../src/components/AllDevicesCards/AllDevicesCards";
import AuthorizedRoute from "../src/components/AuthorizedRoute/AuthorizedRoute";

import { UserProvider, defaultUserState } from "./context/user-context";
import { DeviceProvider, defaultDeviceState } from "./context/device-context";

import DevicesService from "./services/devices-service";

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
            },
            devices: {
                ...defaultDeviceState,
                updateDevices: this.updateDevices,
            }
        }
    }

    static devicesService = new DevicesService();

    updateUser = (user) => {
        this.setState({ user });
    }

    updateDevices = (devices) => {
        this.setState({ devices });
    }
    render() {
        debugger;
        const { user, devices } = this.state;

        return (
            <Router>
                <DeviceProvider value={devices}>
                    <UserProvider value={user}>
                        <NavBar />
                        <Switch>
                            <Route path="/" component={Home} exact={true} />
                            <Route path="/login" component={Login} exact={true} />
                            <Route path="/signup" component={Signup} exact={true} />
                            <Route path="/my-devices" component={MyDevices} exact={true} />
                            <Route path="/all-devices" component={AllDevices} exact={true} />
                            <AuthorizedRoute path="/create-device" component={CreateDevice} exact={true} allowedRoles={'admin'}/>
                            <AuthorizedRoute path="/edit/:deviceId" component={EditDevice} exact={true} allowedRoles={'admin'}/>
                            <Route path="/logout" component={Logout} exact={true}/>
                            <Route path="/review/:deviceId" component={DetailsDevice} exact={true} />
                            <Route component={NotFound} />
                        </Switch>
                    </UserProvider>
                </DeviceProvider>
            </Router>
        );
    }

    async componentDidMount() {
        try {
            debugger;
            const devices = await App.devicesService.getAllDevices();
            this.updateDevices(devices);
        } catch(error) {
            this.setState({ error });
        }
    }
}

export default App;
