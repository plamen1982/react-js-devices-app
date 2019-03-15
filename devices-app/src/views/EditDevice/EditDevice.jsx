import React, { Component } from "react";
import DevicesService from "../../services/devices-service";

class EditDevice extends Component {
    state = {
        model: "",
        description: "",
        image: "",
        creator: "",
        price: "",

    }

    static devicesService = new DevicesService();

    handleOnSumbit = (event) => {
        event.preventDefault();
        const { model, description, image, creator, price } = this.state;
        debugger;
        const { match } = this.props;
        const { params: { deviceId } } = match;
        const requestEditDeviceObject = {
            id: deviceId,
            model,
            description,
            image,
            creator,
            price,
        };

        this.setState({
            error: ""
        }, async () => {
            try {
                const editedDevice = await EditDevice.devicesService.editDevice(requestEditDeviceObject);
                console.log(editedDevice);
                if(!editedDevice.success) {
                    const errors = Object.values(editedDevice.errors).join('');

                    throw new Error(errors);
                }
                } catch(error) {
                    console.log(error);
                }
        })
    };

    handleOnChange = ({ target }) => {

        this.setState({
            [target.id]: target.value,
        });
    };

    render() {
        const {model, description, image, creator, price} = this.state;
        return (
            <div className="form-wrapper">
                <h1>Edit Device</h1>
                <form onSubmit={this.handleOnSumbit}>
                    <div className="form-group">
                        <label htmlFor="model">model</label>
                        <input
                            type="text"
                            name="model"
                            id="model"
                            placeholder="Enter Device model"
                            value={model}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Enter Device description"
                            value={description}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="Enter Device image URL"
                            value={image}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="creator">Creator</label>
                        <input
                            type="text"
                            name="creator"
                            id="creator"
                            value={creator}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Enter Device price"
                            value={price}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}

export default EditDevice;