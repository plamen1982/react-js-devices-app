import React from "react";
import { Link } from "react-router-dom";

import MainMessage from "../../components/MainMessage/MainMessage";
import DeviceCard from "../../components/DeviceCard/DeviceCard";

const Home = () => {
    return (
        <main>
            <div className="welcome-wrapper">
                <MainMessage message={"Welcome to our awsome devices store, stranger!"}>
                    <Link to="/my-devices">View your Devices</Link>
                </MainMessage>
                <h2>Top Rated</h2>
                <div className="row">
                    <div className="card-deck space-top">
                        <DeviceCard
                            imageUrl={
                                "https://images-na.ssl-images-amazon.com/images/I/51fonMmNpnL.jpg"
                            }
                        />
                        <DeviceCard
                            imageUrl={
                                "https://images-na.ssl-images-amazon.com/images/I/51fonMmNpnL.jpg"
                            }
                        />
                        <DeviceCard
                            imageUrl={
                                "https://images-na.ssl-images-amazon.com/images/I/51fonMmNpnL.jpg"
                            }
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
