import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";

class AuthorizedRoute extends Component {
    render() {
        const { isLoggedIn, allowedRoles = [], roles, ...otherProps } = this.props;
        const roleIsAllowed = allowedRoles.length || (
                roles
                    .map(role => role.toLowerCase())
                    .some(role => allowedRoles.includes(role))
            );

        if(!isLoggedIn || !roleIsAllowed) {
            return <Redirect to="/login" />;
        }
        return <Route {...otherProps} />;
    }
}

const AuthorizedRouteWithContext = (props) => {
    return(
        <UserConsumer>
            {
                ({ isLoggedIn, roles }) => (
                    <AuthorizedRoute 
                        {...props}
                        roles={roles}
                        isLoggedIn={isLoggedIn}
                    />
                )
            }
        </UserConsumer>
    );
}

//Use it without Context API if you want
export {
    AuthorizedRoute
}

export default AuthorizedRouteWithContext;