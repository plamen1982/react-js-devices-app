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
        devices.map((device, index) => (
            <DeviceCard
                key={index}
                image={device.image}
                deviceId={device._id}
                {...device}
            />
        ))
    );
}

export default AllDevicesCards;
