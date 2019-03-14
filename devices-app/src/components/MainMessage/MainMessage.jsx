import React, { Component } from "react";
import { Link } from 'react-router-dom';

class MainMessage extends Component {
    render() {
        return(
            <div className="welcome">
            <h1>Welcome to our device store, stranger !</h1>
            <p>
                <Link to="/my-devices">View your Devices</Link>
            </p>
        </div>
        );
    }
}

export default MainMessage;