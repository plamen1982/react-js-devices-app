import React, { Component } from "react";
import FormDevice from "../../components/FormDevice/FormDevice";
import { withDataFromDeviceService } from "../../hocs/with-data-from-device-service";


class CreateDevice extends Component  {
    handleChange = ({ target }) => {
        const inputName = target.name;
        const inputValue = target.value;

        this.props.onChange(inputName, inputValue);
    };

    handleSumbit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    };

    resetState = () => {
        
    }
    render() {
        console.log('create device');
        return (
            <FormDevice 
                handleChange={this.handleChange}
                handleSumbit={this.handleSumbit}
                resetState={this.resetState}
                titleForm="Create New Device"
                buttonName="Create"
            />
        );
    }
}

export default withDataFromDeviceService('createDevice')(CreateDevice);