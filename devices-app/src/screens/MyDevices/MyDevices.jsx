import React, { Component } from "react";
import DevicesService from "../../services/devices-service";

class MyDevices extends Component {
    state = {
        myDevices: []
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
                                        <tr>
                                            <td>{index + 1}: {device.model}</td>
                                            <td>{device.date}</td>
                                            <td>{device.description}</td>

                                            <td>
                                                <a className="btn btn-outline-warning btn-sm" href="/Devices/details/5c76a2aa157aaa2c6084dc54">Return The Device</a>
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
    try{
     const myDevices = await MyDevices.devicesService.borrowDevicesByUser();
     console.log(myDevices)
     this.setState({
         myDevices,
     })

    } catch(error) {
         alert(error.message)
    }
 }
}

export default MyDevices;
