import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <header>
                <nav className="navbar-menu">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/all-devices" exact>All Devices</NavLink>
                    <NavLink to="/my-devices" exact>My Devices</NavLink>
                    <NavLink to="/create-device" exact>Create Device</NavLink>
                    {/* <NavLink to="/logout">Logout</NavLink> */}
                    <NavLink to="/login" exact>Login</NavLink>
                    <NavLink to="/signup" exact>Signup</NavLink>
                </nav>
            </header>
        );
    }
}

export default Navigation;