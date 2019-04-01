// src/providers/UserProvider.js
import React, { Component } from 'react'
// Set Up The Initial Context
const UserContext = React.createContext()
// Create an exportable consumer that can be injected into components
export const UserConsumer = UserContext.Consumer
// Create the provider using a traditional React.Component class
class UserProvider extends Component {
    constructor(props) {
        super(props)

        const userFromStorage = window.localStorage.getItem('user');
        const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};

        this.state = {
            roles: [], 
            username: "", 
            isLoggedIn: false,
            ...parsedUser,
            updateUser: this.updateUser,
          }
    }

  updateUser = (user) => {
    this.setState({ user });
}
  render () {
    return (
      // value prop is where we define what values 
      // that are accessible to consumer components
       <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider;