import React, { Component } from "react";
import AuthenticationService from "../../services/authentication-service";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";
import { ToastContainer } from "react-toastr";

class Signup extends Component {
    state = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        error: "",
    }

    static authService = new AuthenticationService();

    handleOnSumbit = (event) => {
        event.preventDefault();
        const { email, username, password, confirmPassword, error } = this.state;
        const { updateUser } = this.props;

        if(password !== confirmPassword) {
            this.setState({
                error: "Password does not matched"
            });
            return;
        }

        const requestLoginObject = {
            email,
            username,
            password,
        };

        this.setState({
            error: ""
        }, async () => {
            try {
                const credentials = await Signup.authService.signup(requestLoginObject);
                console.log(credentials);
                if(!credentials.success) {
                    const errors = Object.values(credentials.errors).join('');

                    throw new Error(errors);
                }

                window.localStorage.setItem("auth_token", credentials.token);
                window.localStorage.setItem("user", JSON.stringify( {
                    ...credentials.user,
                    isLoggedIn: true,
                }));

                updateUser({
                    isLoggedIn: true,
                    updateUser,
                    ...credentials.user,
                });
            } catch (error) {
                console.log(error);
            }
        });
    };

    handleOnChange = ({ target }) => {

        this.setState({
            [target.id]: target.value,
        });
    };

    render() {
        const { email, username, password, confirmPassword, error } = this.state;
        const { isLoggedIn } = this.props;
        if(error) {
            return (
                <div>{error}</div>
            )
        }
        return (
            <div className="form-wrapper">
                <h1>Register</h1>
                <form onSubmit={this.handleOnSumbit}>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter e-mail"
                            value={email}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Enter your password again"
                            value={confirmPassword}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <input type="submit" value="Register" />
                </form>
            </div>
        );
    }
}

const SignupWithContext = (props) => {
    return(
        <UserConsumer>
            {
                ({ isLoggedIn, updateUser }) => (
                    <Signup 
                        {...props}
                        isLoggedIn={isLoggedIn}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    );
}

export default SignupWithContext;
