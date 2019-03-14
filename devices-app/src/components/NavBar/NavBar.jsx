import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";

class NavBar extends Component {
    render() {
        const { isLoggedIn, username } = this.props;
        return (
            <header>
                <nav className="navbar-menu">
                    <NavLink to="/" exact>
                        Home
                    </NavLink>
                    <NavLink to="/all-devices" exact>
                        All Devices
                    </NavLink>
                    <NavLink to="/my-devices" exact>
                        My Devices
                    </NavLink>
                    <NavLink to="/create-device" exact>
                        Create Device
                    </NavLink>
                    {
                        isLoggedIn 
                        ? ( <NavLink to="/logout">Logout</NavLink> ) 
                    : (
                        <Fragment>
                            <NavLink to="/login" exact>
                                Login
                            </NavLink>
                            <NavLink to="/signup" exact>
                                Signup
                            </NavLink>
                        </Fragment>
                    )}
                    {
                        isLoggedIn
                            ? <span>Hello, {username}</span>
                            : null
                    }
                </nav>
            </header>
        );
    }
}

const NavBarWithConsumer = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, username }) => (
                    <NavBar {...props} isLoggedIn={isLoggedIn} username={username} />
                )
            }
        </UserConsumer>
    );
}

export default NavBarWithConsumer;
