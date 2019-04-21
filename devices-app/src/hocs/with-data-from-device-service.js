import React from 'react';
import DevicesService from "../services/devices-service";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const withDataFromDeviceService = (serviceMethod) => WrappedComponent => {
    return class withDataFormDevice extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                model: "", 
                description: "", 
                image: "", 
                creator: "", 
                price: "",
                submited: false,
            }
        }
        
        static devicesService = new DevicesService();

        handleChange = (inputFieldName, inputFieldValue) => {
            this.setState(() => (
               { [inputFieldName]: inputFieldValue }
            ))
        }

        handleSubmit = async (deviceId) => {
           const { model, description, image, creator, price } = this.state;
           const deviceObjForRequest = {
            model, 
            description, 
            image, 
            creator, 
            price,
           }
           const result = await withDataFormDevice.devicesService[serviceMethod](deviceObjForRequest, deviceId);
           if(result.success) {
               if(serviceMethod === 'editDevice') {
                   toast.success('Successfully edited device');
               } else {
                    toast.success('Successfully created device');
               }
               this.setState({
                submited: true
               })
           } else {
               toast.error(result.message);
           }
        } 

            render() {
                const { submited } = this.state;
                if(submited) {
                    return <Redirect to="/all-devices" />;
                }
                return(
                    <WrappedComponent 
                    {...this.props} 
                    {...this.state} 
                    onChange = { this.handleChange } 
                    onSubmit = { this.handleSubmit } 
                />
            )
        }

        async componentDidMount() {
            if(serviceMethod === 'editDevice') {
                try {
                    const { match: { params: { deviceId } } } = this.props;
                    const device = await withDataFormDevice.devicesService.getDeviceById(deviceId);
                    const { model, description, image, creator, price } = device;

                    this.setState({
                        model, 
                        description, 
                        image, 
                        creator, 
                        price,
                    });
                } catch(error) {
                    toast.error(error.message);
                }
            }
        }
    }
}

export { withDataFromDeviceService };