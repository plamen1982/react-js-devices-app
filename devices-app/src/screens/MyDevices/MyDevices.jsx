import React, { Component } from "react";
import DevicesService from "../../services/devices-service";

class MyDevices extends Component {
    state = {
        myDevices: [],
        isRedirect: false
    }

    static devicesService = new DevicesService();

    render() {
        const { myDevices } = this.state;
        return (

                <div className="container">
                <h1 className="text-center">My Devices</h1>
                <div className="row" >
                    <div className="col-md-12" id="customer-Devices">
                        <div className="box">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <td>Device Model</td>
                                            <td>Date Taken</td>
                                            <td>Description</td>
                                            <td>Return</td>
                                        </tr>
                                    </thead>
                                    <tbody>{
                                    myDevices.map((device, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}: {device.model}</td>
                                            <td>{device.date}</td>
                                            <td>{device.description}</td>

                                            <td>
                                                <button className="btn btn-outline-warning btn-sm" onClick={() => { this.removeDeviceById(device._id) }}>Return The Device</button>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }


   async componentDidMount() {
    try {
     const myDevices = await MyDevices.devicesService.borrowDevicesByUser();
     this.setState({
         myDevices,
         isRedirect: true
     });
    } catch(error) {
         alert(error.message)
    }
 }

 removeDeviceById = async (deviceId) => {
     const { myDevices } = this.state;
     try {
         //TODO add toastify
        const returnedDevice = await MyDevices.devicesService.returnDeviceById(deviceId);
        const remainDevices = myDevices.filter(device => device.model !== returnedDevice.model);
        this.setState({
            myDevices: remainDevices
        })
     } catch(error) {
        alert(error);
     }
 }
}

export default MyDevices;
