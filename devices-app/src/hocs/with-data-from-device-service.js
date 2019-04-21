import React from 'react';
import DevicesService from "../services/devices-service";

const withDataFromDeviceService = (serviceMethod) => WrappedComponent => {
    return class withDataFormDevice extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                model: "", 
                description: "", 
                image: "", 
                creator: "", 
                price: "" 
            }
        }
        
        static devicesService = new DevicesService();

        handleChange = (inputFieldName, inputFieldValue) => {
            this.setState(() => (
               { [inputFieldName]: inputFieldValue }
            ))
            debugger;
        }

        handleSubmit = async (deviceId) => {
            debugger;
           const { model, description, image, creator, price } = this.state;
           const deviceObjForRequest = {
            model, 
            description, 
            image, 
            creator, 
            price,
           }
           debugger;
           const result = await withDataFormDevice.devicesService[serviceMethod](deviceObjForRequest, deviceId);

           if(result.success) {
               alert('Operation was successful');
               this.setState({
                model: "", 
                description: "", 
                image: "", 
                creator: "", 
                price: "" 
               })
           } else {
               console.log('something went wrong', result);
               alert(result.message)
           }
        } 

            render() {
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
                    console.log(error);
                }
            }
        }
    }
}

export { withDataFromDeviceService };




















































// import React from 'react';

// function withDataFromService(Component, requestObject, serviceMethod, ...otherArgs) {
//     return class extends React.Component {
//         constructor(props) {
//             super(props);

//             this.state = {
//                 data: requestObject,
//                 error: null,
//             }
//         }

//         handleOnSumbit = (event) => {
//             event.preventDefault();
//             let deviceId = "";
//             if(this.state.data.id) {
//                 deviceId  = this.state.data.id;
//             }
    
//             const { model, description, image, creator, price } = this.state.data;

//             const requestDeviceObject = { id: deviceId, model, description, image, creator, price }
    
//             this.setState({
//                 error: ""
//             }, async () => {
//                 try {
//                     const device = await serviceMethod(requestDeviceObject);
//                     console.log(device);
//                     if(!device.success) {
//                         const errors = Object.values(device.errors).join('');
    
//                         throw new Error(errors);
//                     }
//                     } catch(error) {
//                         console.log(error);
//                     }
//             })
//         };
    
//         render() {
//             const { data, error } = this.state;
//             if(error) {
//                 return <span>Something went wrong!</span>
//             }

//             return <Component data={data} {...this.props} />;
//         }
//     }
// }

// export default withDataFromService;