import React from "react";
import { Link } from "react-router-dom";

import MainMessage from "../../components/MainMessage/MainMessage";
import DeviceCard from "../../components/DeviceCard/DeviceCard";

const Home = () => {
    return (
        <main>
            <div className="welcome-wrapper">
                <MainMessage 
                    message={"Welcome to our awsome store, stranger!"}>
                    <Link to="/my-devices">View your Devices</Link>
                </MainMessage>
                <h2>Top Rated</h2>
                <div className="row">
                    <div className="card-deck space-top">
                        <DeviceCard />
                        <DeviceCard />
                        <DeviceCard />
                        <DeviceCard />
                        <DeviceCard />
                        <DeviceCard />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
