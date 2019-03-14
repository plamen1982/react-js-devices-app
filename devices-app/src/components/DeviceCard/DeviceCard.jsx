import React, { Component } from "react";
import { Link } from "react-router-dom";

class DeviceCard extends Component {
    render() {
        const { imageUrl, model, description, id } = this.props;
        return (
            <div className="card col-4">
                <img
                    className="card-img-top card-image"
                    src={imageUrl}
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
                        to={`/details/${id}`}
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
