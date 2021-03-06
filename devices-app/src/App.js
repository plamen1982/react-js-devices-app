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

import BorrowedBy from "./screens/BorrowedBy/BorrowedBy";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class App extends Component {
    constructor(props) {
        super(props);

        const userFromStorage = window.localStorage.getItem('user');
        const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};

        this.state = {
            user: {
                ...defaultUserState,
                ...parsedUser
            }
        }
    }

    updateUser = (user) => {
        this.setState({ user });
    }

    updateDevices = () => {
        this.setState();
    }
    
    render() {
        const { user } = this.state;

        const contextForLogin = {
            updateUser: this.updateUser, 
            user
        }

        return (
            <Router>
                <UserProvider value={contextForLogin}>
                    <NavBarWithConsumer />
                    <ToastContainer autoClose={3000}/>
                    <Switch>
                        <Route path="/" component={Home} exact={true} />
                        <Route path="/login" component={LoginWithContext} exact={true} />
                        <Route path="/signup" component={Signup} exact={true} />
                        <Route path="/my-devices" component={MyDevices} exact={true} />
                        <Route 
                            path="/all-devices" 
                            component={AllDevices} 
                            exact={true} 
                            updateDevices={this.updateDevices}
                        />
                        <AuthorizedRouteWithContext path="/create-device" component={CreateDevice} exact={true} allowedRoles={'admin'}/>
                        <AuthorizedRouteWithContext path="/edit/:deviceId" component={EditDevice} exact={true} allowedRoles={'admin'}/>
                        <Route path="/logout" component={Logout} exact={true}/>
                        <Route path="/review/:deviceId" component={DetailsDevice} exact={true}/>
                        <Route path="/borrowedBy/:deviceId" component={BorrowedBy}/>
                        <Route component={NotFound} />
                    </Switch>
                </UserProvider>
            </Router>
        );
    }
    componentDidMount() {
        toast.configure({
            autoClose: 8000,
            draggable: false,
            //etc you get the idea
          });
    }
}

export default App;
