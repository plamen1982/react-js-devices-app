import React, { Component } from "react";

class DetailsDevice extends Component {
    render() {
        return (
            <div className="card col-4">
                <img
                    className="card-img-top card-image"
                    src="https://placeimg.com/640/480/tech"
                    alt="High Tech Product"
                />
                <div className="card-body">
                    <h5 className="card-title">Tablet next generation</h5>
                    <p className="card-text">
                            Description of the High Tech Product
                    </p>
                    <p>Number of likes: <span className="badge badge-secondary">3</span></p>
                    <button
                        type="button"
                        className="btn btn-warning float-right btn-sm"
                    >
                        Like
                    </button>
                </div>
                <div className="card-footer">
                    <small className="text-muted" />
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                            Leave a review
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-warning float-right btn-sm"
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }
}

export default DetailsDevice;
