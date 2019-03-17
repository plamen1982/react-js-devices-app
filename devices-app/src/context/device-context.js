import { createContext } from "react";

const defaultDeviceState = { 
    devices: []
};

const { Consumer: DeviceConsumer, Provider: DeviceProvider } = createContext(defaultDeviceState);

export {
    DeviceConsumer,
    DeviceProvider,
    defaultDeviceState,
}