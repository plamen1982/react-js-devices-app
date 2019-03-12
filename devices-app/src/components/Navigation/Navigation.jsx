import React, { Component } from "react";

class Navigation extends Component {
    render() {
        return (
            <header>
                <nav className="navbar-menu">
                    <a href="/" className="active" aria-current="page">Home</a>
                    <a href="/all-devices">All Devices</a>
                    <a href="/my-devices">My Devices</a>
                    {/* <a href="/logout">Logout</a> */}
                    <a href="/login">Login</a>
                    <a href="/signup">Signup</a>
                </nav>
            </header>
        );
    }
}

export default Navigation;