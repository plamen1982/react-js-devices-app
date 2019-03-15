import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);

        window.localStorage.setItem('user', '');
        window.localStorage.setItem('auth_token', '');
    }

    render() {
        return <Redirect to="/" />;
    }
}

export default Logout;