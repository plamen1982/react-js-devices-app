import React, { Component } from "react";
import AuthenticationService from "../../services/authentication-service";
import { Redirect } from "react-router-dom";

class Login extends Component {
    state = {
        email: "",
        password: "",
        error: "",
        isLoggedIn: false,
    };

    static authService = new AuthenticationService();

    handleOnSumbit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        const requestObject = {
            email,
            password,
        };

        this.setState({
            error: ""
        }, async () => {
            try {
                debugger
                const credentials = await Login.authService.login(requestObject);
    
                console.log(credentials);
                if(credentials) {
                    this.setState({
                        isLoggedIn: true,
                    });
                }
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
        const { email, password, isLoggedIn, error } = this.state;

        if(isLoggedIn) {
            return <Redirect to="/" />;
        }
        return (
            <div className="form-wrapper">
                {
                    error.length
                    ? <h4>Something went wrong: {error}</h4>
                    : null
                }
                <h1>Login</h1>
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
                    <input
                        type="submit"
                        value="Login"
                    />
                </form>
            </div>
        );
    }
}

export default Login;
