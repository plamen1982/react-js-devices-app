import React, { Component } from "react";
import DeviceCard from "../DeviceCard/DeviceCard";
import Loading from "../Loading/Loading";
import DeviceService from "../../services/devices-service";

class AllDevicesCards extends Component {
    state = {
        devices: [],
        isLoading: false,
    };

    /**
     * 
     * @memberof DeviceService
     * @static service
     */
    static service = new DeviceService();

    render() {
        const { devices, isLoading } = this.state;

        if(isLoading) {
            return <Loading />;
        }

        if(!isLoading && !devices.length) {
            return(
                <h1 className="jumbotron">No devices here yet :(</h1>
            );
        }

        return (
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
                    <div className="card-deck space-top">
                        {
                            devices.map(device => (
                            <DeviceCard
                                key={device._id}
                                image={device.image}
                                deviceId={device._id}
                                {...device}
                            />
                        ))
                    }
                    </div>
                </div>
            </div>
        );
    }
    async componentDidMount() {
        try {
            const devices = await AllDevicesCards.service.getAllDevices();
            this.setState({ devices });
        } catch(error) {
            alert(error)
        }
    }
}

export default AllDevicesCards;
