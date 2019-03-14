import React, { Component } from "react";
import { Link } from 'react-router-dom';

class MainMessage extends Component {

    render() {
        const { message, children } = this.props
        return(
            <div className="welcome">
            <h1>{ message }</h1>
            <p>
                { children }
            </p>
        </div>
        );
    }
}

export default MainMessage;