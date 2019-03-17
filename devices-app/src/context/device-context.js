import { createContext } from "react";

const defaultDeviceState = { 
    devices: [],
    isLoading: false,
    updateDevices() {}
};

const { Consumer: DeviceConsumer, Provider: DeviceProvider } = createContext(defaultDeviceState);

export {
    DeviceConsumer,
    DeviceProvider,
    defaultDeviceState,
}