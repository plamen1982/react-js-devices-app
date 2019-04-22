import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";
//TODO NavBar is rendered two times, check why after project is done
class NavBar extends Component {
    state = {
        devices: []
    }

    render() {
        const { user } = this.props;
        const { isLoggedIn, username } = user;
        const isUser = user.roles.includes('User');
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
                   {
                    isUser 
                        ? <NavLink to="/my-devices" exact>My Devices</NavLink>
                        : null
                   } 
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
                            ? <a href="/">Hello, {username}! </a>
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
