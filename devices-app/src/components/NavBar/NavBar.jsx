import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <header>
                <nav className="navbar-menu">
                    <Link to="/" className="active" aria-current="page">Home</Link>
                    <Link to="/all-devices">All Devices</Link>
                    <Link to="/my-devices">My Devices</Link>
                    <Link to="/create-device">Create Device</Link>
                    {/* <Link to="/logout">Logout</Link> */}
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </nav>
            </header>
        );
    }
}

export default Navigation;