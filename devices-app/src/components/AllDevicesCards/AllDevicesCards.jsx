import React from "react";
import DeviceCard from "../DeviceCard/DeviceCard";
import Loading from "../Loading/Loading";

const AllDevicesCards = (props) =>  {

    const { devices, isLoading } = props;

    if(isLoading) {
        return <Loading />;
    }

    if(!isLoading && !devices.length > 0) {
        return(
            <h1 className="jumbotron">No devices here yet :(</h1>
        );
    }

    return (
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
    );
}

export default AllDevicesCards;
