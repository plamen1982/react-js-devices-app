import React, { Component } from "react";
import AllDevicesCards from "../../components/AllDevicesCards/AllDevicesCards";
import { DeviceConsumer } from "../../context/device-context";

class AllDevices extends Component {
    render() {
        const { isLoading, devices } = this.props;
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
                    isLoading={isLoading}
                    devices={devices}
                />
            </div>
        </div>
        )
    }
}

const AllDevicesWithContext = (props) => {
    return(
        <DeviceConsumer> 
            {
                (dev) => (
                    <AllDevices 
                        devices={dev}
                        {...props}
                    />
                )
            }
        </DeviceConsumer>
    );
}

export default AllDevicesWithContext;