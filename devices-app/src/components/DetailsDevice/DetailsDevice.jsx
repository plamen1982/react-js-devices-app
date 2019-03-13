import React, { Component } from "react";

class DetailsDevice extends Component {
    render() {
        return (
            <div className="card col-4">
                <img
                    className="card-img-top card-image"
                    src="https://images-na.ssl-images-amazon.com/images/I/51fonMmNpnL.jpg"
                    alt="Harry Potter"
                />
                <div className="card-body">
                    <h5 className="card-title">Harry Potter</h5>
                    <p className="card-text">
                        Harry Potter and the Philosopher's Stone is a fantasy
                        novel written by British author J. K. Rowling.
                    </p>
                    <p>Number of likes: <span class="badge badge-secondary">3</span></p>
                    <button
                        type="button"
                        className="btn btn-warning float-right btn-sm"
                    >
                        Like
                    </button>
                </div>
                <div className="card-footer">
                    <small className="text-muted" />
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">
                            Leave a review
                        </label>
                        <textarea
                            class="form-control"
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
