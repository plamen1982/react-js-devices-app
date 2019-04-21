import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";
import DevicesService from "../../services/devices-service";
class DeviceCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image : props.image, 
            model: props.model, 
            description: props.description, 
            deviceId: props.deviceId, 
            price: props.price, 
            isBorrowed: props.isBorrowed, 
            isDeleted: false 
        } ;
    }


    static devicesService = new DevicesService();

    render() {
        const { image, model, description, deviceId, price, isBorrowed } = this.state;
        const { user, deleteDeviceById } = this.props;
            let isUser = [];
            let isAdmin = [];
            let isVisitor = true;

        if(user.roles) {
            isUser = user.roles.includes('User');
            isAdmin = user.roles.includes('Admin');
            isVisitor = !user.roles.includes('User')&&!user.roles.includes('Admin');
        }

        return (
            <div className="card col-6">
                <img
                    className="card-img-top card-image"
                    src={image}
                    alt={model}
                />
                <div className="card-body">
                    <h5 className="card-title">
                        {model}
                    </h5>
                    <p className="card-text">
                        {description}
                    </p>
                    <h5 className="card-title">
                        {price}
                    </h5>
                </div>
                
                <div className="card-footer">
                    <small className="text-muted" />
                    {
                        isVisitor&&isBorrowed
                            ? <Link className="btn btn-primary float-right btn-sm" to={`borrowedBy/${deviceId}`}> This device is borrowed by: </Link>
                            : (
                                isVisitor
                                ? <Link className="btn btn-warning float-right btn-sm" to={"login"}> Login to borrow this device </Link>
                                : (
                                    isAdmin
                                    ? <Link className="btn btn-warning float-right btn-sm" to={`/edit/${deviceId}`}> Edit </Link>
                                    : (
                                        isUser&&isBorrowed
                                        ? <Link className="btn btn-primary float-right btn-sm" to={`borrowedBy/${deviceId}`} > This device is borrowed by: </Link>
                                        : <button className="btn btn-primary float-right btn-sm" onClick={() => this.borrowDeviceById(deviceId)}> Borrow </button>
                                    )

                            )
                        )
                    }

                    {
                        isVisitor
                        ? null 
                        : (
                            isAdmin
                            ? <button className="btn btn-danger float-right btn-sm" onClick={() => deleteDeviceById(deviceId)}  > Delete </button>
                            : <Link className="btn btn-secondary float-right btn-sm" to={`/review/${deviceId}`}> Review </Link>
                        )
                    }

                </div>
            </div>
        );
    }

    borrowDeviceById = async (deviceId) => {
        try {
            const returnedDevice = await DeviceCard.devicesService.borrowDevice(deviceId);  
            if(returnedDevice.success) {
                this.setState({ isBorrowed: true });
                await DeviceCard.devicesService.editDevice(this.state, deviceId)
            }  
        } catch(error) {
            //TODO replace with toastr
            alert(error);
        }
    }
}

const DeviceCardWithUserConsumer = (props) => {
    return (
        <UserConsumer>
            {
                ({ user }) => (
                    <DeviceCard 
                        {...props}
                        user={user}
                    />
                )
            }
        </UserConsumer>
    )
}

export default DeviceCardWithUserConsumer;
