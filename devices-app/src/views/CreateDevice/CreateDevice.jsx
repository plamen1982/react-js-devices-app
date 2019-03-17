import React from "react";
import FormDevice from "../../components/FormDevice/FormDevice";
import withDataFromDeviceService from "../../hocs/with-data-from-device-service";


const CreateDevice = (props) => {
    const handleChange = ({ target }) => {
        const inputName = target.name;
        const inputValue = target.value;

        props.onChange(inputName, inputValue);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        props.onSubmit();
    };

    return (
        <FormDevice 
            handleChange={handleChange}
            handleSumbit={handleSumbit}
            titleForm="Create New Device"
            buttonName="Create"
        />
    );
}

export default withDataFromDeviceService('createDevice')(CreateDevice);