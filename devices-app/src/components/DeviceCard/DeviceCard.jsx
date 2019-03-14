import React, { Component } from "react";
import { Link } from "react-router-dom";

class DeviceCard extends Component {
    render() {
        return (
            <div className="card col-4">
                <img
                    className="card-img-top card-image"
                    src="https://images-na.ssl-images-amazon.com/images/I/419M8dJUa-L._SY346_.jpg"
                    alt="What the Wind Knows "
                />
                <div className="card-body">
                    <h5 className="card-title">What the Wind Knows </h5>
                    <p className="card-text">
                        Anne Gallagher grew up enchanted by her grandfather’s
                        stories of Ireland. Heartbroken at his death, she
                        travels to his childhood home to spread his ashes.
                    </p>
                </div>
                <div className="card-footer">
                    <small className="text-muted" />
                    <Link
                        className="btn btn-primary float-right btn-sm"
                        to="/details/5c75009b6fa7f81b2459134e"
                    >
                        Details
                    </Link>
                    <button
                        type="button"
                        className="btn btn-warning float-right btn-sm"
                    >
                        Borrow
                    </button>
                </div>
            </div>
        );
    }
}

export default DeviceCard;
