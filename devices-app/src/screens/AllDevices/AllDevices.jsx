import React, { Component } from "react";
import AllDevicesCards from "../../components/AllDevicesCards/AllDevicesCards";
import DevicesService from "../../services/devices-service";

class AllDevices extends Component {
    state = {
        devices: [],
        isLoading: true,
        currentDeviceForSearch: ""
    }

    static devicesService = new DevicesService();

    handleOnChange = (event) => {
        const { target: { value } } = event;
        this.setState({
            currentDeviceForSearch: value
        })
    }

    handleOnSearch = (event) => {
        event.preventDefault();
        const { currentDeviceForSearch, devices } = this.state;

        let filtredDevices = devices.filter(device => device.model.toLowerCase().includes(currentDeviceForSearch.toLowerCase()));
        this.setState({
            devices: filtredDevices
        });
    }

    render() {
        const { isLoading } = this.props;
        const { devices } = this.state;
        return(
            <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="jumbotron-heading text-center">
                        All Devices
                    </h1>
                    <form className="form-inline md-form form-sm active-cyan active-cyan-2">
                        <i className="fa fa-search" aria-hidden="true" />
                    </form>
                    <label htmlFor="device">Search device:</label>
                    <input placeholder="search device..." onChange={this.handleOnChange} type="device" className="form-control" id="device" />
                    <button type="button" className="btn btn-warning float-right btn-sm" onClick={this.handleOnSearch}>Search</button>
                    <br/>
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