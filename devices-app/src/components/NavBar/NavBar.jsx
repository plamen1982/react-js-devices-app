import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";
import DevicesService from "../../services/devices-service";
//TODO NavBar is rendered two times, check why after project is done
class NavBar extends Component {
    state = {
        devices: []
    }

    static devicesService = new DevicesService();

    render() {
        const { image, model, description, deviceId, price, isBorrowed } = this.state;
        const { user } = this.props;
        const { isLoggedIn, username } = user;
        const isUser = user.roles.includes('User');
        const isAdmin = user.roles.includes('Admin');
        const isVisitor = !user.roles.includes('User')&&!user.roles.includes('Admin');
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
                            ? <span className="text-danger">Hello, {username}! </span>
                            : null
                    }
                </nav>
            </header>
        );
    }

   async componentDidMount() {
       try{
           debugger;
        const allDevicesByUser = await NavBar.devicesService.borrowDeviceByUser();
        debugger;

       } catch(error) {
            alert(error.message)
       }
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
