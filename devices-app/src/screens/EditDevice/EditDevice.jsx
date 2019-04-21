import React from "react";
import FormDevice from "../../components/FormDevice/FormDevice";
import { withDataFromDeviceService } from "../../hocs/with-data-from-device-service";
import DevicesService from "../../services/devices-service";
class EditDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device: {},
            deviceId: ''
        }
    }

    handleChange = ({ target }) => {
        const inputName = target.name;
        const inputValue = target.value;

        this.props.onChange(inputName, inputValue);
    }

    handleSumbit = (e) => {
        e.preventDefault();
        const { match: { params: { deviceId } } } = this.props;
        this.props.onSubmit(deviceId);
    }

    static devicesService = new DevicesService();

    render() {
        const { model, description, image, price, creator } = this.props;
        const device = { model, description, image, price, creator };

        return (
            <FormDevice 
                handleChange={this.handleChange}
                handleSumbit={this.handleSumbit}
                titleForm="Edit Device"
                buttonName="Edit"
                device={device}
            />
        );
    }
}

export default withDataFromDeviceService('editDevice')(EditDevice);