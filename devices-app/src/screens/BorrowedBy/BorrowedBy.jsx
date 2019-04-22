import React, { Component } from "react";
import DevicesService from "../../services/devices-service";

class BorrowedBy extends Component {

    state = {
        username: "",
        date: "",
        model: ""
    }

    static devicesService = new DevicesService();

    render() {
        const { username, date, model } = this.state; 
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron col-centered text-center">
                            <h4>This device: <p className="font-weight-bold">{model}</p></h4>
                            <h4>Is borrowed by username: <p className="font-weight-bold">{username}</p></h4>
                            <h4>On date: <p className="font-weight-bold">{date}</p></h4>
                        </div>
                    </div>
                </div>
            </div>


        );
    }

    async componentDidMount() {
        const { match: { params: { deviceId } } } = this.props;

        const user = await BorrowedBy.devicesService.getUserByBorrowedDevice(deviceId);

        this.setState({
            username: user.user.username,
            date: user.date,
            model: user.model
        });
    }
}

export default BorrowedBy;
