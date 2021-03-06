import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";
import DevicesService from "../../services/devices-service";
import { toast } from "react-toastify";
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
                       Model name: {model}
                    </h5>
                    <p className="card-text">
                       Description: {description}
                    </p>
                    <p className="card-text">
                      Price: {price}
                    </p>
                </div>
                
                <div className="card-footer">
                    <small className="text-muted" />
                    {
                        isVisitor&&isBorrowed
                            ? <Link className="btn btn-primary float-right btn-sm" to={`borrowedBy/${deviceId}`}> See who borrow this device </Link>
                            : (
                                isVisitor
                                ? <Link className="btn btn-warning float-right btn-sm" to={"login"}> Login to borrow this device </Link>
                                : (
                                    isAdmin
                                    ? <Link className="btn btn-warning float-right btn-sm" to={`/edit/${deviceId}`}> Edit </Link>
                                    : (
                                        isUser&&isBorrowed
                                        ? <Link className="btn btn-primary float-right btn-sm" to={`borrowedBy/${deviceId}`} > See who borrow this device </Link>
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
                            : null
                            // : <Link className="btn btn-secondary float-right btn-sm" to={`/review/${deviceId}`}> Review </Link>
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
                toast.success(returnedDevice.message)
                await DeviceCard.devicesService.editDevice(this.state, deviceId)
            }  
        } catch(error) {
            toast.error(error.message);
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
