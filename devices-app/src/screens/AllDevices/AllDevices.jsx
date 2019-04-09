import React, { Component } from "react";
import AllDevicesCards from "../../components/AllDevicesCards/AllDevicesCards";
import DevicesService from "../../services/devices-service";

class AllDevices extends Component {
    state = {
        devices: [],
        isLoading: true
    }

    static devicesService = new DevicesService();

    render() {
        const { isLoading } = this.props;
        const { devices } = this.state;
        return(
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1 className="jumbotron-heading text-center">
                            All Devices
                        </h1>
                        <form className="form-inline md-form form-sm active-cyan active-cyan-2">
                            <i className="fa fa-search" aria-hidden="true" />
                        </form>
                    </div>
                </div>
            <div className="row">
                <AllDevicesCards 
                    devices={devices}
                    isLoading={isLoading}
                />
            </div>
        </div>
        )
    }
    async componentDidMount() {
        try {
            const devices = await AllDevices.devicesService.getAllDevices();
            this.setState({ devices, isLoading: false })
        } catch(error) {
            this.setState({ error });
        }
    }
}



export default AllDevices;