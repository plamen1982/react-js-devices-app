import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";

class AuthorizedRoute extends Component {
    render() {
        const { isLoggedIn, ...otherProps } = this.props;

        if(!isLoggedIn) {
            return <Redirect to="/login" />;
        }

        return <Route {...otherProps} />;
    }
}

const AuthorizedRouteWithContext = (props) => {
    return(
        <UserConsumer>
            {
                ({ isLoggedIn }) => (
                    <AuthorizedRoute 
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