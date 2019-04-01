import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";

class AuthorizedRoute extends Component {
    render() {

        const { allowedRoles, roles, ...otherProps } = this.props;
        let { isLoggedIn } = this.props;
        const roleIsAllowed = (
                roles
                    .map(role => role.toLowerCase())
                    .some(role => role === allowedRoles)
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
                ({ user }) => (
                    <AuthorizedRoute 
                        {...props}
                        roles={user.roles}
                        isLoggedIn={user.isLoggedIn}
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