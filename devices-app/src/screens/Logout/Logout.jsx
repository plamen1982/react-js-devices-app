import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer, defaultUserState } from "../../context/user-context";
import { toast } from "react-toastify";
class Logout extends Component {
    constructor(props) {
        super(props);

        window.localStorage.setItem('user', '');
        window.localStorage.setItem('auth_token', '');
        props.updateUser(defaultUserState);
    }

    render() {
        toast.success('Loged Out Successully.')
        return <Redirect to="/" />;
    }
}

const LogoutWithContext = (props) => {
    return(
        <UserConsumer>
            {
                ({ updateUser }) => (
                    <Logout 
                        {...props}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    );
}

export default LogoutWithContext;