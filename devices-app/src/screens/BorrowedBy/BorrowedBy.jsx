import React, { Component } from "react";
import DevicesService from "../../services/devices-service";

class BorrowedBy extends Component {

    state = {
        username: "",
        date: ""
    }

    static devicesService = new DevicesService();

    render() {
        const { username, date } = this.state; 
        return (
            <div className="jumbotron col-centered">
                <h4>This device is borrowed by username: <p class="text-uppercase">{username}</p></h4>
                <h4>On date: <p class="text-uppercase">{date}</p></h4>
            </div>
        );
    }

    async componentDidMount() {
        const { match: { params: { deviceId } } } = this.props;

        const user = await BorrowedBy.devicesService.getUserByBorrowedDevice(deviceId);
        console.log(user.user.username)
        console.log(user.date)
        this.setState({
            username: user.user.username,
            date: user.date
        });
        debugger;
    }

}

export default BorrowedBy;
