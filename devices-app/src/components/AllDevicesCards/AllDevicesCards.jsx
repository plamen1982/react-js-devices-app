import React from "react";
import DeviceCard from "../DeviceCard/DeviceCard";
import Loading from "../Loading/Loading";

class AllDevicesCards extends React.Component {

    render() {
        const { isLoading, devices, deleteDeviceById } = this.props;
        let loading;
        let loadingMessage;
        if(isLoading) {
             loading = <Loading />;
        }
        if(!isLoading && !devices.length > 0) {
            loadingMessage = <h1 className="jumbotron">No devices here yet :(</h1>
        }
        return (
            isLoading 
                ? loading
                : !isLoading && !devices.length > 0    
                    ? loadingMessage
                    : devices.map((device) => (
                        <DeviceCard
                            key={device.model}
                            image={device.image}
                            deviceId={device._id}
                            deleteDeviceById={deleteDeviceById}
                            {...device}
                        />
            ))
        );
    }
}

export default AllDevicesCards;
