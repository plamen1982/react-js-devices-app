import React, { Component } from "react";
import { Link } from "react-router-dom";

class DeviceCard extends Component {
    render() {
        const { image, model, description, deviceId } = this.props;
        debugger;
        return (
            <div className="card col-4">
                <img
                    className="card-img-top card-image"
                    src={image}
                    alt={model}
                />
                <div className="card-body">
                    <h5 className="card-title">
                        {model}
                    </h5>
                    <p className="card-text">
                        {description}
                    </p>
                </div>
                <div className="card-footer">
                    <small className="text-muted" />
                    <Link
                        className="btn btn-primary float-right btn-sm"
                        to={`/review/${deviceId}`}
                    >
                        Review
                    </Link>
                    <Link
                        className="btn btn-danger float-right btn-sm"
                        to={`/edit/${deviceId}`}
                    >
                        Edit
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
