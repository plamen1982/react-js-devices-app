import React from "react";
import { Link } from "react-router-dom";

import MainMessage from "../../components/MainMessage/MainMessage";

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
                        <div className="card col-4">
                            <img
                                className="card-img-top card-image"
                                src="https://images-na.ssl-images-amazon.com/images/I/419M8dJUa-L._SY346_.jpg"
                                alt="What the Wind Knows"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    What the Wind Knows{" "}
                                </h5>
                                <p className="card-text">
                                    Anne Gallagher grew up enchanted by her
                                    grandfather’s stories of Ireland.
                                    Heartbroken at his death, she travels to his
                                    childhood home to spread his ashes.
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted" />
                                <Link
                                    to="/details/deviceId"
                                    type="button"
                                    className="btn btn-primary float-right btn-sm"
                                >
                                    Details
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-warning float-right btn-sm"
                                >
                                    Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
