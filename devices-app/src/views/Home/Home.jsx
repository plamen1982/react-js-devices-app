import React from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";

import MainMessage from "../../components/MainMessage/MainMessage";

const Home = (props) => {
    const { isLoggedIn, username } = props;
    return (
        <main>
            <div className="welcome-wrapper">
                {
                    isLoggedIn 
                        ? <MainMessage message={`Welcome to our awesome devices store, ${username}!`}>
                            <Link to="/all-devices">View all Devices</Link>
                        </MainMessage>
                        : <MainMessage message={`Welcome to our awesome devices store, stranger!`}>
                                <Link to="/all-devices">View all Devices</Link>
                        </MainMessage>
                }

            </div>
        </main>
    );
};

const HomeWithConsumer = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, username }) => (
                    <Home {...props} isLoggedIn={isLoggedIn} username={username} />
                )
            }
        </UserConsumer>
    );
}

export default HomeWithConsumer;
