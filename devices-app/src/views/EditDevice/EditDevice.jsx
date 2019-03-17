import React from "react";
import FormDevice from "../../components/FormDevice/FormDevice";
import { withDataFromDeviceService } from "../../hocs/with-data-from-device-service";

const EditDevice = (props) => {
    const handleChange = ({ target }) => {
        const inputName = target.name;
        const inputValue = target.value;

        props.onChange(inputName, inputValue);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        const { match: { params: { deviceId } } } = props;
        props.onSubmit(deviceId);
    };

    return (
        <FormDevice 
            handleChange={handleChange}
            handleSumbit={handleSumbit}
            titleForm="Edit Device"
            buttonName="Edit"
        />
    );
}

export default withDataFromDeviceService('editDevice')(EditDevice);