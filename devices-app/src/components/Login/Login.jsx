import React, { Component } from "react";
import AuthenticationService from "../../services/devices-service";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    static authService = new AuthenticationService();

    handleSumbit = async (event) => {
        event.preventDefault();

        try {
            
        } catch (error) {
            console.log(error);
        }
    };

    handleOnChange = ({ target }) => {
        this.setState({
            [target.id]: target.value,
        });
    };

    render() {
        const { email, password } = this.state;

        return (
            <div className="form-wrapper">
                <h1>Login</h1>
                <form>
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
                        onSubmit={this.handleOnChange}
                    />
                </form>
            </div>
        );
    }
}

export default Login;
