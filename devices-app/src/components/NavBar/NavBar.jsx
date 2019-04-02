import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";

class NavBar extends Component {
    render() {
        const { user } = this.props;
        const { isLoggedIn, username } = user;
        const isAdmin = user.roles.includes('Admin');
        return (
            <header>
                <nav className="navbar-menu">
                    <NavLink to="/" exact>
                        Home
                    </NavLink>
                    <NavLink to="/all-devices" exact>
                        All Devices
                    </NavLink>
                    {/* <NavLink to="/my-devices" exact>
                        My Devices
                    </NavLink> */}
                    {
                        isAdmin
                            ? <NavLink to="/create-device" exact>Create Device</NavLink>
                            : null
                    }

                    {
                        isLoggedIn 
                        ? <NavLink to="/logout">Logout</NavLink>
                        : <Fragment>
                            <NavLink to="/login" exact>Login</NavLink>
                            <NavLink to="/signup" exact>Signup</NavLink>
                            </Fragment>
                    }
                    {
                        isLoggedIn
                            ? <span className="text-danger">Hello, {username}! </span>
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
                ({ user }) => (
                    <NavBar {...props} user={user} />
                )
            }
        </UserConsumer>
    );
}

export default NavBarWithConsumer;
