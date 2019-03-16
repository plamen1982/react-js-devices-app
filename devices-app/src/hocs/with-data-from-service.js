import React from 'react';
import DevicesService from "../services/devices-service";

const withDataFromDeviceService = (serviceMethod) => WrappedComponent => {
    return class withCustomForm extends React.Component {
        state = {
            model: "", 
            description: "", 
            image: "", 
            creator: "", 
            price: "" 
        }
        
        static devicesService = new DevicesService();

        handleChange = (name, value) => {
            this.setState(() => (
               {[name]: value}
            ))
        }

        handleSubmit = () => {
            withCustomForm.devicesService[serviceMethod](this.state);
        } 
            render() {
                return(
                    <WrappedComponent 
                    {...this.props} 
                    {...this.state} 
                    onChange = {this.handleChange} 
                    onSubmit = {this.handleSubmit} 
                />
            )
        }
    }
}

export default withDataFromDeviceService;




















































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