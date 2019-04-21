import React, { Component } from "react";
import AuthenticationService from "../../services/authentication-service";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";
import { toast } from "react-toastify";

class Signup extends Component {
    state = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        error: "",
        isSignedUp: false,
    }

    static authService = new AuthenticationService();

    handleOnSubmit = (event) => {
        event.preventDefault();
        const { email, username, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            toast.error('Password does not matched.')
        } else {

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
                    if(!credentials.success) {
                        if(credentials.errors) {
                            toast.error(credentials.errors.email);
                        }
                        toast.error(credentials.message);
                    } else {
                        this.setState({
                            isSignedUp: true
                        })
                    }
    
                } catch (error) {
                    toast.error(error.message);
                }
            });
        }
    };

    handleOnChange = ({ target }) => {
        this.setState({
            [target.id]: target.value,
        });
    };

    render() {
        const { email, username, password, confirmPassword, isSignedUp } = this.state;

        if(isSignedUp) {
            toast.success('You Register Successfully.')
            return <Redirect to="/login" />;
        }

        return (
            <div className="form-wrapper">
                <h1>Register</h1>
                <form onSubmit={this.handleOnSubmit}>
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
