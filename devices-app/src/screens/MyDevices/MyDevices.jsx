import React, { Component } from "react";

class MyDevices extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="text-center">My Devices</h1>
                <div className="row" >
                    <div className="col-md-12" id="customer-Devices">
                        <div className="box">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Device</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>#1</th>
                                            <td>27.02.2019 г., 16:46:02 ч.</td>
                                            <td>$ 5.00</td>
                                            <p>
                                                <span className="label label-info">
                                                    Available
                                                </span>
                                            </p>
                                            <td>
                                                <a
                                                    className="btn btn-outline-warning btn-sm"
                                                    href="/Devices/details/5c76a2aa157aaa2c6084dc54"
                                                >
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyDevices;