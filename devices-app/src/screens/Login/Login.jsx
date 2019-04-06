import React, { Component } from "react";
import AuthenticationService from "../../services/authentication-service";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";

class Login extends Component {

    state = {
        email: "",
        password: "",
        error: "",
    };

    static authService = new AuthenticationService();

    handleOnSumbit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const { updateUser } = this.props;

        const requestLoginObject = {
            email,
            password,
        };

        this.setState({
            error: ""
        }, async () => {
            try {
                const credentials = await Login.authService.login(requestLoginObject);
                console.log("Token", credentials.token);
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
               this.setState({
                   error
               })
            }
        });
    };

    handleOnChange = ({ target }) => {

        this.setState({
            [target.id]: target.value,
        });
    };

    render() {
        const { email, password, error } = this.state;
        const { isLoggedIn } = this.props;

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

const LoginWithContext = (props) => {
    return(
        <UserConsumer>
            {
                ({ user, updateUser }) => (
                    <Login 
                        isLoggedIn={user.isLoggedIn}
                        updateUser={updateUser}
                        {...props}
                    />
                )
            }
        </UserConsumer>
    );
}

export default LoginWithContext;
