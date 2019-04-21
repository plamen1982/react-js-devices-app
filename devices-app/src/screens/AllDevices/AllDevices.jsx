import React, { Component } from "react";
import AllDevicesCards from "../../components/AllDevicesCards/AllDevicesCards";
import DevicesService from "../../services/devices-service";
import { toast } from "react-toastify"
class AllDevices extends Component {
    state = {
        devices: [],
        filteredDevices:[],
        isLoading: true,
        currentDeviceForSearch: "",
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
        if(currentDeviceForSearch) {
            const filteredDevices = devices.filter(device => device.model.toLowerCase().includes(currentDeviceForSearch.toLowerCase()));
            this.setState({
                filteredDevices
            });
        } else {
            this.setState({
                filteredDevices: devices
            });
        }
    }

    deleteDeviceById = async (deviceId) => {
        const { devices } = this.state;
        try {
            const deletedDeviceFromDB = await AllDevices.devicesService.deleteDeviceById(deviceId);

            const filteredDevices = devices.filter(device => device.model !== deletedDeviceFromDB.device.model);
            toast.success('Devices were deleted successuly')
            this.setState({
                isDeleted: true,
                filteredDevices,
                devices: filteredDevices
            });
        } catch(error) {
            toast.error(error.message);
        }
    }

    render() {
        const { isLoading } = this.props;
        const { filteredDevices } = this.state;
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
                    <div className="search">
                        <input placeholder="Search A Device..." onChange={this.handleOnChange} type="device" className="form-control search-device" id="device" />
                        <button type="button" className="btn btn-success float-right btn-sm" onClick={this.handleOnSearch}>Search</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <AllDevicesCards 
                    devices={filteredDevices}
                    isLoading={isLoading}
                    deleteDeviceById={this.deleteDeviceById}
                />
            </div>
        </div>
        )
    }
    async componentDidMount() {
        try {
            const devices = await AllDevices.devicesService.getAllDevices();
            this.setState({ devices, isLoading: false, filteredDevices: devices })
        } catch(error) {
            this.setState({ error });
        }
    }
}



export default AllDevices;