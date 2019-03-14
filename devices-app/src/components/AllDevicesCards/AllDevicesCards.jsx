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
                            <input
                                className="form-control form-control-sm ml-3 w-75"
                                type="text"
                                placeholder="Search for the Device you are looking for..."
                                aria-label="Search"
                                name="query"
                                value=""
                            />
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="card-deck space-top">
                        {
                            devices.map(device => (
                            <DeviceCard
                                key={device.id}
                                imageUrl={
                                    "https://images-na.ssl-images-amazon.com/images/I/51fonMmNpnL.jpg"
                                }
                                {...device}
                            />
                        ))
                    }
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-12">
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <a className="page-link" href="/store/0">
                                    «
                                </a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link" href="/store/1">
                                    1
                                </a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link" href="/store/2">
                                    »
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    async componentDidMount() {
        try {
            debugger;
            const devices = await AllDevicesCards.service.getAllDevices();
            this.setState({ devices });
        } catch(error) {
            alert(error)
        }
    }
}

export default AllDevicesCards;
